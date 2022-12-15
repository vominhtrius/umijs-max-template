export default {
  'POST /v1/auth/login': (req: any, res: any) => {
    const { password, username } = req.body;
    if (username === 'root' && password === 'root') {
      res.json({
        token: 'ROOT-TOKEN',
      });
    } else if (username === 'guest' && password === 'guest') {
      res.json({
        token: 'GUEST-TOKEN',
      });
    } else {
      res.status(400).send({
        message: 'This is an error!',
      });
    }
  },
};
