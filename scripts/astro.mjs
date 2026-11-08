import {spawn} from 'node:child_process';
const child=spawn(process.execPath,['node_modules/astro/bin/astro.mjs',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
child.on('error',err=>{console.error(err);process.exitCode=1;});
child.on('exit',(code,signal)=>{if(signal)process.kill(process.pid,signal);else process.exitCode=code??1;});
