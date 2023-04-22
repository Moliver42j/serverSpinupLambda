const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'your-region' });

exports.handler = async (event, context) => {
  const instanceId = 'i-0795bc283c713e30d';

  try {
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
