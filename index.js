const next = require("next");
const { parse } = require("url");

const nextMiddleware = debug => {
  const app = next({ debug });
  const handle = app.getRequestHandler();
  const render = app.render.bind(app);
  return app.prepare().then(() => (_req, _res, next) => {
    const parsedUrl = parse(_req.url, true);
    const _path = parsedUrl.pathname;
    const _query = parsedUrl.query;
    _req.parsedUrl = parsedUrl;
    _res.view = {
      handle: ({req=_req,res=_res,path=_path,query=_query}) => handle(req, res, path, query),
      render: ({req=_req,res=_res,path=_path,query=_query}) => render(req, res, path, query),
    };
    next();
  });
};

module.exports = nextMiddleware;
