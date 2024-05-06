const botIp = 'http://94.198.217.203:8000/v1';

interface INotification {
  text: string;
  photo: string;
  button: boolean;
  link: string;
  linkText: string;
  userId: string;
  shopId: string;
}

interface IShare {
  ID: string;
}

export async function stopBot(token: string) {
  try {
    const response = await fetch(`${botIp}/bot`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
}

export async function createBot(token: string) {
  try {
    const response = await fetch(`${botIp}/bot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    console.log(response.status);

    return response.status;
  } catch (error) {
    console.log(error);
  }
}

export async function sendNotification(body: INotification) {
  try {
    const response = await fetch(`${botIp}/notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log(response.status);

    return response.status;
  } catch (error) {
    console.log(error);
  }
}

export async function startShare(body: IShare) {
  try {
    const response = await fetch(`${botIp}/mail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log(response.status);

    return response.status;
  } catch (error) {
    console.log(error);
  }
}
