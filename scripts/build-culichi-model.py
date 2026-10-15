"""Author Culichi's local glTF asset with Blender 4.3+. No downloaded models.
Run: blender --background --factory-startup --python scripts/build-culichi-model.py
Z-up in Blender; the glTF exporter converts to Y-up. Named joints drive web gestures.
"""
import bpy, math, random
from pathlib import Path
from mathutils import Vector
from math import sin, cos, pi
ROOT = Path(__file__).resolve().parents[1]
random.seed(19)
bpy.context.preferences.filepaths.save_version=0
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)

def mat(name, hexcolor, rough=.5, metal=0):
    m=bpy.data.materials.new(name)
    rgb=[int(hexcolor[i:i+2],16)/255 for i in (0,2,4)]
    m.diffuse_color=(*[c/12.92 if c<=.04045 else ((c+.055)/1.055)**2.4 for c in rgb],1)
    m.use_nodes=True; bs=m.node_tree.nodes.get('Principled BSDF'); bs.inputs['Base Color'].default_value=m.diffuse_color
    bs.inputs['Roughness'].default_value=rough; bs.inputs['Metallic'].default_value=metal
    return m
fur=mat('Fox amber fur','dc641a',.72); cream=mat('Warm ivory fur','f9e9cb',.8); brown=mat('Ear tips and brows','44251e',.72)
navy=mat('culichi_cloth','172b40',.64); accent=mat('culichi_accent','24c8dd',.32,.25)
dark=mat('Graphite fabric','121c29',.68); glove=mat('Glove leather','243141',.65); sole=mat('Ivory rubber','ced9df',.82)
black=mat('Nose and eye rim','101318',.29); white=mat('Eye white','f6f6ea',.25); green=mat('Emerald iris','178b44',.28)
lightgreen=mat('Iris inner ring','57c23c',.35); pupil=mat('Pupil','061910',.17); silver=mat('Hardware','a4b8c6',.27,.75)
lens=mat('Lens blue','4cb8d1',.17,.35); yellow=mat('Safety yellow','efbd24',.45); pcb=mat('Circuit green','175c43',.6)

# Fine directional fur and woven cloth normals are packed in the GLB, not external requests.
def surface_normal(materials, name, textile=False):
    import numpy as np
    size=512
    yy,xx=np.mgrid[0:size,0:size]
    rng=np.random.default_rng(31 if textile else 9)
    if textile:
        nx=np.sin(xx*2*pi/5)*.16;ny=np.sin(yy*2*pi/5)*.16
    else:
        phase=rng.random(size)*2*pi
        nx=np.sin(xx*1.7+np.sin(yy*.08)*.4+phase[xx])*.20
        ny=np.cos(yy*.22+phase[xx])*.04
    pixels=np.zeros((size,size,4),dtype=np.float32)
    pixels[:,:,0]=nx*.5+.5;pixels[:,:,1]=ny*.5+.5
    pixels[:,:,2]=np.sqrt(1-nx*nx-ny*ny)*.5+.5;pixels[:,:,3]=1
    img=bpy.data.images.new(name,width=size,height=size,alpha=True)
    img.colorspace_settings.name='Non-Color';img.pixels.foreach_set(pixels.ravel());img.pack()
    for m in materials:
        nodes=m.node_tree.nodes; tex=nodes.new('ShaderNodeTexImage');tex.image=img
        uv=nodes.new('ShaderNodeTexCoord');mapping=nodes.new('ShaderNodeVectorMath');mapping.operation='SCALE';mapping.inputs[3].default_value=5 if textile else 3
        m.node_tree.links.new(uv.outputs['UV'],mapping.inputs[0]);m.node_tree.links.new(mapping.outputs['Vector'],tex.inputs['Vector'])
        normal=nodes.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=.24 if textile else .36
        m.node_tree.links.new(tex.outputs['Color'],normal.inputs['Color']);m.node_tree.links.new(normal.outputs['Normal'],nodes.get('Principled BSDF').inputs['Normal'])
surface_normal([fur,cream,brown],'Culichi fine directional fur')
surface_normal([navy,dark,glove],'Culichi woven fabric',True)

def empty(name,loc=(0,0,0),parent=None,outfit=None):
    o=bpy.data.objects.new(name,None); bpy.context.collection.objects.link(o); o.location=loc; o.parent=parent
    if outfit:o['outfit']=outfit
    return o
root=empty('Culichi')

def finish(o,name,material,parent):
    o.name=name
    if material:o.data.materials.append(material)
    o.parent=parent
    if o.type=='MESH':
        for p in o.data.polygons:p.use_smooth=True
    return o

def ell(name,loc,scale,m,parent=root,rot=(0,0,0),segments=24):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments,ring_count=16,location=(0,0,0))
    o=bpy.context.object; o.location=loc; o.scale=scale; o.rotation_euler=rot
    return finish(o,name,m,parent)

def box(name,loc,scale,m,parent=root,bevel=.04,rot=(0,0,0)):
    bpy.ops.mesh.primitive_cube_add(); o=bpy.context.object; o.location=loc; o.dimensions=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.rotation_euler=rot
    mod=o.modifiers.new('Rounded tailored edges','BEVEL');mod.width=bevel;mod.segments=3
    bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
    return finish(o,name,m,parent)

def tube(name,points,r,m,parent=root):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=6;c.bevel_depth=r;c.bevel_resolution=2
    s=c.splines.new('BEZIER');s.bezier_points.add(len(points)-1)
    for p,co in zip(s.bezier_points,points):p.co=co;p.handle_left_type='AUTO';p.handle_right_type='AUTO'
    o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.parent=parent;c.materials.append(m)
    return o

def loft(name,rings,m,parent=root,sides=32,sub=1):
    # Each ring: x,y,z, lateral radius, depth radius; organic profile, no stacked primitives.
    verts=[];faces=[]
    for x,y,z,rx,ry in rings:
        for i in range(sides):
            a=2*pi*i/sides;verts.append((x+rx*cos(a),y+ry*sin(a),z))
    for j in range(len(rings)-1):
        for i in range(sides):
            a=j*sides+i;b=j*sides+(i+1)%sides;faces.append((a,b,b+sides,a+sides))
    faces.append(tuple(reversed(range(sides))));faces.append(tuple((len(rings)-1)*sides+i for i in range(sides)))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);finish(o,name,m,parent)
    if sub:
        mod=o.modifiers.new('Sculpted silhouette','SUBSURF');mod.levels=sub
        bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
    return o

def spindle(name,points,radii,m,parent=root):
    # Curved tapered tuft / finger / tail with cross sections perpendicular to its path.
    verts=[];faces=[];n=16
    for j,(co,r) in enumerate(zip(points,radii)):
        co=Vector(co);prev=Vector(points[max(0,j-1)]);nxt=Vector(points[min(len(points)-1,j+1)]);t=(nxt-prev).normalized()
        u=t.cross(Vector((0,1,0)))
        if u.length<.01:u=t.cross(Vector((1,0,0)))
        u.normalize();v=t.cross(u).normalized()
        for i in range(n):
            a=2*pi*i/n;verts.append(co+r*(u*cos(a)+v*sin(a)))
    for j in range(len(points)-1):
        for i in range(n):
            a=j*n+i;b=j*n+(i+1)%n;faces.append((a,b,b+n,a+n))
    faces.append(tuple(reversed(range(n))));faces.append(tuple((len(points)-1)*n+i for i in range(n)))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);finish(o,name,m,parent)
    mod=o.modifiers.new('Organic smoothing','SUBSURF');mod.levels=2 if 'tail' in name.lower() else 1;bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
    return o

# Shoes with layered soles, shaped uppers, toe guards, tongues and crossed laces.
for side in (-1,1):
    x=side*.245
    ell('Rubber outsole',(x,-.09,.12),(.225,.37,.115),dark)
    ell('Layered midsole',(x,-.11,.17),(.231,.365,.10),sole)
    ell('Sneaker upper',(x,-.08,.26),(.205,.315,.16),navy)
    ell('Toe guard',(x,-.285,.23),(.19,.12,.085),glove)
    box('Ankle collar',(x,.01,.38),(.32,.3,.19),navy,bevel=.065)
    box('Sneaker tongue',(x,-.205,.35),(.19,.05,.21),glove,bevel=.04,rot=(.2,0,0))
    tube('Shoe accent',[(x-side*.19,-.23,.27),(x-side*.21,-.02,.30),(x-side*.15,.15,.34)],.016,accent)
    for i in range(4):
        y=-.28+i*.043;z=.31+i*.024
        tube('Lace cross',[(x-.08,y,z),(x+.08,y+.031,z+.015)],.009,dark)
        tube('Lace cross',[(x+.08,y,z+.006),(x-.08,y+.031,z+.019)],.009,dark)
    loft('Tailored cargo leg',[(x,0,.36,.115,.13),(x,0,.43,.14,.15),(x,0,.55,.155,.17),(x*.94,.005,.76,.15,.18),(x*.9,0,.95,.18,.19),(x*.83,0,1.16,.20,.21),(x*.8,0,1.32,.19,.20)],navy)
    box('Cargo pocket',(x+side*.10,-.17,1.03),(.18,.055,.23),dark,bevel=.035,rot=(0,side*.15,side*-.12))
    box('Pocket flap',(x+side*.10,-.205,1.12),(.19,.03,.065),navy,bevel=.015)
    tube('Cargo accent',[(x+side*.16,-.21,1.10),(x+side*.16,-.21,1.04),(x+side*.09,-.22,1.04)],.009,accent)
    tube('Knee seam',[(x-.115,-.14,.69),(x,-.18,.66),(x+.115,-.14,.69)],.006,glove)
    for i in range(5):
        tube('Ribbed trouser cuff',[(x-.1,-.105,.415+i*.014),(x,-.14,.415+i*.014),(x+.1,-.105,.415+i*.014)],.004,dark)
loft('Trouser hips',[(0,.01,1.1,.29,.18),(0,0,1.18,.36,.215),(0,0,1.36,.34,.22),(0,0,1.43,.28,.19)],navy)
loft('Jacket body',[(0,0,1.36,.29,.195),(0,0,1.43,.35,.24),(0,0,1.62,.34,.24),(0,.005,1.83,.40,.23),(0,.025,2.02,.43,.22),(0,.02,2.12,.34,.20),(0,.01,2.19,.24,.17)],navy)
# Chest bib visible through tailored jacket front.
ell('Ivory chest',(0,-.21,1.92),(.16,.06,.31),cream)
for side in (-1,1):
    tube('Jacket zipper',[(side*.06,-.251,1.43),(side*.105,-.271,1.68),(side*.15,-.25,1.93),(side*.13,-.16,2.18)],.014,silver)
    tube('Jacket front edge',[(side*.085,-.255,1.43),(side*.127,-.27,1.68),(side*.173,-.25,1.93),(side*.15,-.17,2.18)],.022,navy)
    tube('Shoulder piping',[(side*.15,-.13,2.13),(side*.32,-.16,2.08),(side*.44,-.12,1.98)],.014,accent)
    tube('Jacket pocket',[(side*.20,-.227,1.51),(side*.29,-.21,1.64)],.021,dark)
    tube('Pocket cyan inset',[(side*.205,-.25,1.52),(side*.27,-.24,1.62)],.008,accent)
    for z in (1.80,1.86,1.92):
        tube('Culichi three-chevron badge',[(side*.23-.055,-.24,z+.015),(side*.23,-.258,z-.02),(side*.23+.055,-.24,z+.015)],.012,accent)
    tube('Stand collar',[(side*.145,-.12,2.12),(side*.19,.005,2.17),(side*.13,.13,2.15)],.065,dark)
for i in range(9):
    z=1.39+i*.007;tube('Jacket hem rib',[(-.29,-.1,z),(0,-.24,z),(.29,-.1,z)],.004,dark)
box('Zipper pull',(.06,-.285,1.47),(.027,.02,.08),silver,bevel=.006)
# Shoulder, elbow and wrist pivots are exported and animated independently.
for side in (-1,1):
    shoulder=empty('wave_shoulder' if side==-1 else 'rest_shoulder',(side*.38,0,2.02),root)
    loft('Upper sleeve',[(0,0,.03,.10,.12),(side*.08,0,-.05,.16,.17),(side*.14,0,-.19,.15,.15),(side*.19,-.015,-.35,.12,.13),(side*.20,-.02,-.41,.12,.12)],navy,shoulder)
    tube('Sleeve seam',[(side*.12,-.14,-.03),(side*.23,-.13,-.22),(side*.28,-.09,-.39)],.011,accent,shoulder)
    elbow=empty('wave_elbow' if side==-1 else 'rest_elbow',(side*.20,-.02,-.38),shoulder)
    loft('Forearm sleeve',[(0,0,.025,.125,.125),(side*.015,-.035,-.06,.13,.13),(side*.015,-.07,-.20,.12,.12),(0,-.08,-.32,.1,.1)],navy,elbow)
    for i in range(3):tube('Natural sleeve fold',[(side*-.08,-.08,-.08-i*.055),(side*.01,-.15,-.11-i*.055),(side*.09,-.09,-.09-i*.055)],.009,glove,elbow)
    loft('Knitted cuff',[(0,-.08,-.25,.105,.105),(0,-.08,-.34,.10,.10),(0,-.08,-.37,.085,.085)],dark,elbow)
    tube('Cuff trim',[(-.08,-.12,-.34),(0,-.175,-.34),(.08,-.12,-.34)],.012,accent,elbow)
    wrist=empty('wave_wrist' if side==-1 else 'rest_wrist',(0,-.08,-.39),elbow)
    ell('Gloved palm',(0,-.012,-.10),(.105,.063,.14),glove,wrist)
    # Relaxed spread fingers model; rounded knuckles with real individual digits.
    for j in range(4):
        x=(j-1.5)*.046;length=[.14,.18,.17,.13][j]
        spindle('Glove finger',[(x,-.01,-.16),(x*1.2,-.018,-.21),(x*1.35,-.029,-.19-length),(x*1.4,-.04,-.20-length)],[.027,.026,.024,.006],glove,wrist)
        tube('Finger seam',[(x,-.067,-.16),(x*1.2,-.072,-.22)],.003,silver,wrist)
    spindle('Glove thumb',[(side*.075,-.005,-.07),(side*.13,-.018,-.12),(side*.15,-.03,-.17),(side*.14,-.035,-.19)],[.045,.034,.028,.009],glove,wrist)
    tube('Glove panel seam',[(-.07,-.063,-.055),(0,-.081,-.10),(.07,-.063,-.055)],.005,accent,wrist)
    if side==1:shoulder.rotation_euler.y=-.12;elbow.rotation_euler.x=-.16
# Single curved brush tail behind body. Separate cream tip joins matching cross-section.
tail=empty('tail_joint',(0,.15,1.28),root)
spindle('Single fox tail',[(0,0,0),(.26,.12,-.15),(.65,.18,-.30),(1.01,.15,-.17),(1.15,.12,.15),(1.12,.10,.46)],[.10,.20,.32,.39,.37,.27],fur,tail)
spindle('Cream tail tip',[(1.15,.12,.15),(1.12,.10,.46),(1.02,.08,.70),(.83,.05,.86),(.66,.03,.90)],[.37,.29,.22,.12,.004],cream,tail)
# Refined face. The muzzle is remeshed as a single sculpted form below.
head=empty('head_joint',(0,0,2.66),root)
ell('Sculpted fox head',(0,0,.04),(.60,.40,.56),fur,head,segments=48)
for side in (-1,1):
    # Ear silhouette with rounded pointed tip, dark outer rim and recessed ivory inner shell.
    rings=[(side*.39,.04,.32,.20,.10),(side*.49,.055,.47,.205,.095),(side*.56,.065,.69,.14,.073),(side*.60,.07,.88,.055,.04),(side*.61,.07,.96,.003,.005)]
    loft('Fox ear',rings,fur,head,sub=2)
    loft('Dark ear tip',[(side*.575,.07,.77,.10,.06),(side*.60,.07,.90,.045,.034),(side*.61,.07,.97,.003,.004)],brown,head,sub=2)
    loft('Inner ear',[(side*.43,-.045,.43,.12,.025),(side*.51,-.04,.58,.13,.025),(side*.56,-.017,.77,.065,.019),(side*.595,.025,.90,.006,.006)],cream,head,sub=2)
    for i in range(3):
        z=-.09-i*.09
        spindle('Orange cheek tuft',[(side*.40,0,z),(side*.57,-.035,z+.025),(side*(.72-i*.025),-.01,z+.14)],[.17,.13,.002],fur,head)
# Cream muzzle: rounded lip/cheek mass with pointed soft cheek fur.
muzzle=[]
for side in (-1,1):
    muzzle.append(ell('Muzzle sculpt',(side*.20,-.32,-.205),(.31,.18,.205),cream,head,segments=32))
    for i in range(3):
        z=-.12-i*.085
        muzzle.append(spindle('Ivory cheek fur',[(side*.31,-.28,z),(side*.52,-.24,z-.01),(side*(.68-i*.025),-.17,z+.06)],[.14,.105,.002],cream,head))
muzzle.append(ell('Chin',(0,-.30,-.34),(.26,.12,.105),cream,head))
bpy.ops.object.select_all(action='DESELECT')
for o in muzzle:
    bpy.context.view_layer.objects.active=o;o.select_set(True)
    if o.type=='CURVE':bpy.ops.object.convert(target='MESH')
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
bpy.context.view_layer.objects.active=muzzle[0];bpy.ops.object.join();o=bpy.context.object;o.name='Continuous ivory muzzle'
mod=o.modifiers.new('Sculpt union','REMESH');mod.mode='VOXEL';mod.voxel_size=.018;mod.use_smooth_shade=True;bpy.ops.object.modifier_apply(modifier=mod.name)
mod=o.modifiers.new('Smooth sculpt','SMOOTH');mod.factor=1.1;mod.iterations=4;bpy.ops.object.modifier_apply(modifier=mod.name)
# Nose and restrained closed-mouth expression.
ell('Nose',(0,-.495,-.115),(.10,.061,.067),black,head)
for side in (-1,1):
    ell('Nostril',(side*.042,-.547,-.125),(.022,.012,.014),brown,head)
    tube('Quiet confident smile',[(0,-.489,-.23),(side*.10,-.486,-.25),(side*.21,-.451,-.225),(side*.26,-.419,-.19)],.007,brown,head)
tube('Philtrum',[(0,-.531,-.16),(0,-.501,-.23)],.006,brown,head)
# Focused emerald eyes: dark orbital rims, shaded irises and upper eyelids.
for side in (-1,1):
    x=side*.235
    ell('Eye socket',(x,-.331,.095),(.200,.081,.178),brown,head,rot=(0,side*-.14,side*-.12))
    ell('Eye white',(x,-.371,.087),(.180,.067,.158),white,head,rot=(0,side*-.14,side*-.12))
    ell('Emerald iris',(x-side*.016,-.435,.08),(.087,.024,.114),green,head)
    ell('Iris inner',(x-side*.016,-.455,.065),(.060,.011,.087),lightgreen,head)
    ell('Pupil',(x-side*.016,-.467,.086),(.040,.013,.086),pupil,head)
    ell('Eye catchlight',(x-side*.034-.014,-.483,.145),(.025,.012,.031),white,head)
    ell('Small catchlight',(x+.027,-.481,.025),(.010,.006,.013),white,head,segments=16)
    # A gently lowered inner brow produces attentive seriousness rather than anger.
    tube('Upper eyelid',[(x-side*.155,-.40,.16),(x-side*.06,-.423,.209),(x+side*.07,-.40,.226),(x+side*.15,-.345,.17)],.022,fur,head)
    tube('Sculpted focused brow',[(x-side*.13,-.38,.235),(x-side*.025,-.39,.28),(x+side*.09,-.34,.32),(x+side*.15,-.29,.30)],.025,brown,head)
# Swept forelock, individually sculpted tufts.
spindle('Swept forelock',[(.16,-.08,.51),(.03,-.23,.61),(-.17,-.28,.58),(-.35,-.29,.42)],[.15,.14,.10,.002],fur,head)
spindle('Front hair lock',[(.06,-.12,.53),(-.07,-.31,.48),(-.16,-.37,.32),(-.18,-.38,.26)],[.12,.12,.07,.001],fur,head)
spindle('Crown lock',[(.08,.04,.51),(-.08,.005,.64),(-.25,.015,.69),(-.37,.05,.64)],[.12,.12,.065,.001],fur,head)
# Extra fur contours break the smooth toy silhouette without expensive particle hair.
for side in (-1,1):
    for i in range(8):
        x=side*(.31+i*.028);z=-.20-(i%3)*.045
        tube('Fine cheek grooming',[(x,-.462+i*.015,z),(x+side*.04,-.43+i*.015,z-.01),(x+side*.07,-.40+i*.015,z+.01)],.0025,sole,head)
# Six professional accessory groups. Their custom extras drive visibility in Three.js.
def outfitgroup(slug,parent=root):return empty('outfit_'+slug,parent=parent,outfit=slug)
cyber=outfitgroup('cybersecurity',head)
# Headset + compact visor, no face-obscuring mask.
for side in (-1,1):
    ell('SOC headset cup',(side*.58,.02,.08),(.085,.12,.16),dark,cyber)
    tube('SOC headset light',[(side*.64,-.07,.17),(side*.66,-.08,.06),(side*.64,-.07,-.02)],.015,accent,cyber)
tube('Headset bridge',[(-.56,.13,.19),(-.40,.21,.49),(0,.22,.58),(.40,.21,.49),(.56,.13,.19)],.035,dark,cyber)
tube('SOC microphone',[(.60,-.02,-.01),(.56,-.29,-.17),(.34,-.44,-.24)],.018,dark,cyber)
ell('Microphone tip',(.34,-.44,-.24),(.044,.035,.03),accent,cyber)
dev=outfitgroup('development',head)
# Soft close-fit tech cap behind forelock, plus a small code badge at chest.
ell('Developer cap',(0,.08,.46),(.47,.33,.20),dark,dev)
box('Cap brim',(0,-.24,.44),(.66,.24,.045),navy,dev,bevel=.04)
devbody=outfitgroup('development')
box('Code badge',(.23,-.275,1.84),(.15,.018,.14),dark,devbody,bevel=.015)
for side in (-1,1):tube('Code mark',[(.23+side*.05,-.29,1.87),(.23+side*.075,-.29,1.84),(.23+side*.05,-.29,1.81)],.008,accent,devbody)
elec=outfitgroup('electrical',head)
ell('Safety hardhat',(0,.06,.48),(.48,.34,.24),yellow,elec)
box('Hardhat brim',(0,-.11,.40),(.99,.58,.055),yellow,elec,bevel=.07)
tube('Hardhat ridge',[(0,-.25,.48),(0,-.16,.68),(0,.12,.72),(0,.33,.54)],.035,yellow,elec)
elecbody=outfitgroup('electrical')
for side in (-1,1):tube('Reflective vest piping',[(side*.29,-.205,1.46),(side*.30,-.235,1.74),(side*.26,-.21,2.04)],.023,sole,elecbody)
box('Electrician tool pouch',(.36,-.05,1.18),(.19,.19,.26),brown,elecbody,bevel=.025)
for i in range(3):tube('Insulated tools',[(.30+i*.05,-.14,1.24),(.30+i*.05,-.14,1.47)],.014,[yellow,accent,dark][i],elecbody)
electronics=outfitgroup('electronics',head)
for side in (-1,1):
    box('Lab goggles frame',(side*.21,-.38,.39),(.32,.065,.15),dark,electronics,bevel=.05)
    box('Lab goggles lens',(side*.21,-.421,.39),(.26,.015,.105),lens,electronics,bevel=.035)
tube('Goggle bridge',[(-.055,-.4,.39),(0,-.43,.41),(.055,-.4,.39)],.018,silver,electronics)
lab=outfitgroup('electronics')
box('Lab pocket',(.24,-.255,1.65),(.15,.025,.17),navy,lab,bevel=.015)
for i in range(2):tube('Precision probes',[(.21+i*.05,-.28,1.65),(.21+i*.05,-.28,1.82)],.008,[silver,accent][i],lab)
repair=outfitgroup('repair',head)
tube('Repair magnifier band',[(-.55,.01,.29),(-.33,-.26,.45),(0,-.33,.47),(.33,-.26,.45),(.55,.01,.29)],.035,dark,repair)
ell('Magnifier housing',(.18,-.32,.48),(.14,.065,.14),dark,repair)
ell('Magnifier lens',(.18,-.38,.48),(.105,.018,.105),lens,repair)
repbody=outfitgroup('repair')
box('Repair apron',(0,-.254,1.61),(.47,.04,.44),dark,repbody,bevel=.045)
box('Apron tool pocket',(0,-.29,1.51),(.32,.035,.14),navy,repbody,bevel=.015)
for i in range(3):tube('Precision screwdrivers',[(-.08+i*.08,-.32,1.48),(-.08+i*.08,-.32,1.68)],.012,[accent,silver,yellow][i],repbody)
service=outfitgroup('customer-service',head)
tube('Support headset arch',[(-.56,.06,.08),(-.48,.14,.42),(0,.19,.57),(.48,.14,.42),(.56,.06,.08)],.035,dark,service)
for side in (-1,1):ell('Support ear pad',(side*.57,.02,.02),(.08,.11,.13),accent,service)
tube('Support boom',[(-.59,-.01,-.02),(-.50,-.33,-.19),(-.27,-.44,-.22)],.02,dark,service)
ell('Support microphone',(-.27,-.44,-.22),(.047,.035,.03),black,service)
servicebody=outfitgroup('customer-service')
box('Service ID',(.23,-.275,1.73),(.13,.018,.16),sole,servicebody,bevel=.01)
box('ID stripe',(.23,-.29,1.77),(.11,.008,.025),accent,servicebody,bevel=.004)
# Save/export reproducible mesh; all outfits included, no cameras/lights in model.
for o in bpy.data.objects:
    # Convert curves once so the browser has only actual mesh buffers.
    if o.type=='CURVE':
        bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o;bpy.ops.object.convert(target='MESH')
# Cylindrical UVs for authored lofts/curves (spheres retain their spherical UVs).
for o in list(bpy.data.objects):
    if o.type=='MESH' and not o.data.uv_layers:
        uv=o.data.uv_layers.new(name='UVMap')
        for polygon in o.data.polygons:
            for loopindex in polygon.loop_indices:
                v=o.data.vertices[o.data.loops[loopindex].vertex_index].co
                uv.data[loopindex].uv=(math.atan2(v.y,v.x)/(2*pi)+.5,v.z)
# Batch compatible meshes into a small number of draw calls; joints and costume extras survive.
batches={}
for o in list(bpy.data.objects):
    if o.type=='MESH':batches.setdefault((o.parent,tuple(o.data.materials)),[]).append(o)
for objects in batches.values():
    if len(objects)<2:continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join()
# Explicit local-file asset; individual named pivots retained by glTF.
(ROOT/'public/models').mkdir(parents=True,exist_ok=True)
bpy.ops.export_scene.gltf(filepath=str(ROOT/'public/models/culichi.glb'),export_format='GLB',export_extras=True,export_cameras=False,export_lights=False,export_animations=False,export_yup=True)
# Studio render is a review artifact of the actual geometry, not the concept image.
for o in bpy.data.objects:
    p=o
    while p:
        if p.get('outfit'):o.hide_render=True;o.hide_set(True);break
        p=p.parent
scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.samples=64;scene.cycles.use_denoising=False
scene.render.resolution_x=850;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.render.film_transparent=True
scene.world.color=(.22,.22,.22)
def aim(o,point):o.rotation_euler=(Vector(point)-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(3.3,-8,3.3));camera=bpy.context.object;aim(camera,(.15,0,1.82));camera.data.type='ORTHO';camera.data.ortho_scale=4.1;scene.camera=camera
for loc,power,size,color in [((-3,-4,6),650,5,(1,.83,.65)),((4,-2,4),500,4,(.6,.85,1)),((1,3,5),800,3,(1,.64,.32))]:
    bpy.ops.object.light_add(type='AREA',location=loc);l=bpy.context.object;l.data.energy=power;l.data.shape='DISK';l.data.size=size;l.data.color=color;aim(l,(0,0,2))
scene.view_settings.view_transform='AgX'
(ROOT/'art/culichi').mkdir(parents=True,exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'art/culichi/culichi.blend'))
scene.render.filepath='/tmp/culichi-model-preview.png';bpy.ops.render.render(write_still=True)
print('CULICHI_MODEL_READY',ROOT/'public/models/culichi.glb')
