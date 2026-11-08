import test from 'node:test';
import assert from 'node:assert/strict';
import { normaliseCategory, countVisiblePhotos } from '../src/scripts/gallery.ts';
test('unknown categories safely show all photographs',()=>{assert.equal(normaliseCategory('all'),'all'); assert.equal(normaliseCategory('bad<script>'),'all'); assert.equal(normaliseCategory(null),'all');});
test('known categories filter exactly and maintain valid zero counts',()=>{assert.equal(normaliseCategory('sports'),'sports');assert.equal(countVisiblePhotos(['campus','sports','sports'],'sports'),2);assert.equal(countVisiblePhotos(['campus'],'ncc'),0);assert.equal(countVisiblePhotos(['campus','sports'],'all'),2);});
