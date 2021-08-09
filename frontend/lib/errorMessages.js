import { message } from 'antd';

const errorMessages = (response, messageText) => {
  // eslint-disable-next-line no-console
  console.log({ response, messageText });
  const { errors, graphQLErrors, networkError } = response;
  if (messageText?.length) {
    message.error(messageText);
  }
  if (errors?.length) {
    errors.forEach((error) => message.error(error));
    return;
  }
  if (graphQLErrors?.length) {
    graphQLErrors.forEach((error) => message.error(`Oops! Something went wrong. ${error.message}`));
    return;
  }
  if (networkError) {
    message.error(`Oops! Connection error. ${networkError}`);
    return;
  }
  if (!messageText) {
    message.error('Oops! Something went wrong...');
  }
};

export default errorMessages;
