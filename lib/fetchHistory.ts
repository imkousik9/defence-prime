const URL = process.env.NEXT_PUBLIC_URL;

export const fetchHistory = async (req) => {
  const res = await fetch(`${URL}/api/history`, {
    headers: { cookie: req.headers.cookie }
  });

  const history = await res.json();

  return history;
};
