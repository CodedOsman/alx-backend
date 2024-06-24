#!/usr/bin/yarn test
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
    const BIG_BROTHER = sinon.spy(console);
    const QUEUE = createQueue({ name: 'push_notification_code_test' });

    before(() => {
	QUEUE.testMode.enter(true);
    });

    after(() => {
	QUEUE.testMode.clear();
	QUEUE.testMode.exit();
    });

    afterEach(() => {
	BIG_BROTHER.log.resetHistory();
    });

    it('displays an error message if jobs is not an array', () => {
	expect(
	    createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
	).to.throw('Jobs is not an array');
    });

    it('adds jobs to the queue with the correct type', (done) => {
	expect(QUEUE.testMode.jobs.length).to.equal(0);
	const jobInfos = [
	          {
