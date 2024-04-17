export async function stopBot(token: string) {
  try {
    const response = await fetch('http://147.45.106.238:8000/v1/bot', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    });

    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
}

export async function createBot(token: string) {
  try {
    const response = await fetch('http://147.45.106.238:8000/v1/bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    });

    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
}
