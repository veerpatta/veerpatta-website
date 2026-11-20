import test from 'node:test';
import assert from 'node:assert/strict';
import {activeDataset, createMeasurement, measurementSource, measurementConfig, measurementReady, parseConsent, verifiedMetaTransport, type MeasurementEvent} from '../src/scripts/measurement.ts';
const example = { enabled:true,datasetId:'123456789012345' };
const origin = 'https://vpps.co.in';

test('published setup is off; switches, nonnumeric IDs, and missing transport fail closed',()=>{
 const sink = () => assert.fail('inactive setup emitted');
 assert.equal(measurementConfig.enabled,false);
 assert.equal(measurementConfig.datasetId,'');
 assert.equal(verifiedMetaTransport,null);
 assert.equal(measurementReady,false);
 assert.equal(activeDataset(example,null),null);
 assert.equal(activeDataset({enabled:true,datasetId:'123&url=unsafe'},sink),null);
 const disabled=createMeasurement(measurementConfig,sink,origin,'/hi/');
 disabled.setConsent('on');
 disabled.recordEnquiry({});
});

test('only explicit canonical marketing paths are accepted and no query/hash is retained',()=>{
 assert.equal(measurementSource(origin,'/hi/admissions/pre-primary/'),origin+'/hi/admissions/pre-primary/');
 for(const path of ['/hi/admissions/?fbclid=example','/hi/admissions/#enquiry','/hi/gallery/','//example.org/','/hi/%E0/']) assert.equal(measurementSource(origin,path), null);
 assert.equal(measurementSource('https://preview.example.org','/hi/'),null);
});

test('consent needs a real unexpired on timestamp and absence/garbage means off',()=>{
 const t=1_790_000_000_001;
 assert.equal(parseConsent(null,t),'off');
 assert.equal(parseConsent('on:fake',t),'off');
 assert.equal(parseConsent(`on:${t+1}`,t),'off');
 assert.equal(parseConsent(`on:${t}`,t),'on');
 assert.equal(parseConsent(`on:${t-180*86400000}`,t),'off');
});

test('no event on load/decline; one PageView after consent and one Lead per confirmed receipt, no retroactivity',()=>{
 const events: MeasurementEvent[]=[];
 const boundary=createMeasurement(example,e=>events.push(e),origin,'/hi/admissions/');
 const acceptedBefore={};
 boundary.recordEnquiry(acceptedBefore);
 assert.deepEqual(events,[]);
 boundary.setConsent('on');
 boundary.setConsent('on');
 boundary.recordEnquiry(acceptedBefore);
 const acceptedNow={};
 boundary.recordEnquiry(acceptedNow);
 boundary.recordEnquiry(acceptedNow);
 boundary.setConsent('off');
 const acceptedAfterRevocation={};
 boundary.recordEnquiry(acceptedAfterRevocation);
 boundary.setConsent('on');
 boundary.recordEnquiry(acceptedAfterRevocation);
 assert.deepEqual(events,[
  {datasetId:example.datasetId,name:'PageView',sourceUrl:origin+'/hi/admissions/'},
  {datasetId:example.datasetId,name:'Lead',sourceUrl:origin+'/hi/admissions/'},
 ]);
 boundary.recordEnquiry({});
 assert.equal(events.length,3);
});
