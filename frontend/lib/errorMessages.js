import { message } from 'antd';

const errorMessages = (errors = [], messageText) => {
  // eslint-disable-next-line no-console
  console.log({ errors, messageText });
  if (messageText && messageText.length) {
    message.error(messageText);
  } else if (errors.length) {
    errors.forEach((error) => message.error(error));
  } else {
    message.error('Oops! Please try again...');
  }
};

export default errorMessages;
