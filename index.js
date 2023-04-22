const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'your-region' });

exports.handler = async (event, context) => {
  const instanceId = 'i-0795bc283c713e30d';

  try {
    const data = await ec2.describeInstances({ InstanceIds: [instanceId] }).promise();
    const instance = data.Reservations[0].Instances[0];
    const state = instance.State.Name;

    if (event.action === 'start' && state === 'running') {
      console.log(`Instance ${instanceId} is already running`);
      return;
    }

    if (event.action === 'stop' && state === 'stopped') {
      console.log(`Instance ${instanceId} is already stopped`);
      return;
    }

    if (event.action === 'stop') {
      await ec2.stopInstances({ InstanceIds: [instanceId] }).promise();
      console.log(`Instance ${instanceId} stopped`);
    } else if (event.action === 'start') {
      await ec2.startInstances({ InstanceIds: [instanceId] }).promise();
      console.log(`Instance ${instanceId} started`);
    } else {
      console.log(`Invalid action ${event.action}`);
      return;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
