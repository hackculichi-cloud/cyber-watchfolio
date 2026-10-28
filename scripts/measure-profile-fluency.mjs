// Diagnostic samples, not a cross-machine performance gate. Run against a production preview.
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const base=process.env.FLUENCY_BASE_URL||'http://127.0.0.1:4173';
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined,headless:true});
const report=[];
for(let round=0;round<3;round++){
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.addInitScript(()=>{window.__longTasks=[];new PerformanceObserver(list=>{window.__longTasks.push(...list.getEntries().map(x=>({start:x.startTime,duration:x.duration})));}).observe({type:'longtask',buffered:true});});
 const cdp=await context.newCDPSession(page);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await cdp.send('Performance.enable');
 const metrics=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const run=async(name,action)=>{const before=await metrics();const start=await page.evaluate(()=>performance.now());await action();await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));const after=await metrics();const long=await page.evaluate(start=>window.__longTasks.filter(x=>x.start>=start),start); report.push({round,name,taskMs:(after.TaskDuration-before.TaskDuration)*1000,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000,layoutMs:(after.LayoutDuration-before.LayoutDuration)*1000,layoutCount:after.LayoutCount-before.LayoutCount,styleMs:(after.RecalcStyleDuration-before.RecalcStyleDuration)*1000,nodes:after.Nodes,longTasks:long.length,longTaskMax:Math.max(0,...long.map(x=>x.duration))});};
 await run('electrical-cold',async()=>{await page.goto(base+'/electrical');await page.locator('[data-copper-title] [data-feed-path]').first().waitFor();await page.evaluate(()=>document.fonts.ready);await page.locator('[data-profile-workspace] img').evaluate(im=>im.decode());});
 console.log('images',round,await page.locator('[data-profile-workspace] img').evaluate(el=>({width:el.clientWidth,dpr:devicePixelRatio,current:el.currentSrc}))); 
 await run('open-residential',()=>page.locator('[data-specialty="residential"]').click());
 await run('open-projects',()=>page.locator('[data-area-tab="projects"]').click());
 await run('open-certificates',()=>page.locator('[data-area-tab="certificate"]').click());
 await run('open-tools',()=>page.locator('[data-area-tab="tools"]').click());
 await run('return-summary',()=>page.locator('[data-area-tab="overview"]').click());
 await context.close();
}
await browser.close();
if (process.env.FLUENCY_REPORT) writeFileSync(process.env.FLUENCY_REPORT,JSON.stringify(report,null,2));
for(const name of [...new Set(report.map(x=>x.name))]) {const rows=report.filter(x=>x.name===name);const median=k=>rows.map(x=>x[k]).sort((a,b)=>a-b)[Math.floor(rows.length/2)];console.log(name,JSON.stringify({taskMs:median('taskMs'),scriptMs:median('scriptMs'),layoutMs:median('layoutMs'),styleMs:median('styleMs'),layouts:median('layoutCount'),longTasks:median('longTasks'),maxLongTask:median('longTaskMax')}));}
