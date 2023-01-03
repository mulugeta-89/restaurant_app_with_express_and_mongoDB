app.use(session({
    name: 'sessionid',
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  
  }))
  function auth(req, res, next){
    console.log(req.session)
  
    
    if(!req.session.user){
      const authHeader = req.headers.authorization
      if(!authHeader){
        const err = new Error("you are not authenticated")
        err.status = 401
        next(err)
        res.setHeader("WWW-Authenticate", "Basic")
        return
      }
        const auth = new Buffer.from(authHeader.split(" ")[1], 'base64').toString().split(":")
        const username = auth[0]
        const password = auth[1]
  
        if(username === 'admin' && password === 'password'){
          res.session.user = 'admin'
          next()
        }
        else {
          const err = new Error("You are not authenticated")
          err.status = 401
          res.setHeader("WWW-Authenticate", "Basic")
          next(err)
        }
      }
        else {
          if(req.session.user === 'admin'){
            next()
          }
          else {
            const err = new Error("you are not authenticated")
            err.status = 401
            next(err)
          }
        }
      
    }



    function auth(req, res, next){
        console.log(req.signedCookies)
      
        
        if(!req.signedCookies.user){
          const authHeader = req.headers.authorization
          if(!authHeader){
            const err = new Error("you are not authenticated")
            err.status = 401
            next(err)
            res.setHeader("WWW-Authenticate", "Basic")
            return
          }
            const auth = new Buffer.from(authHeader.split(" ")[1], 'base64').toString().split(":")
            const username = auth[0]
            const password = auth[1]
      
            if(username === 'admin' && password === 'password'){
              res.cookie('user', 'admin', {signed: true})
              next()
            }
            else {
              const err = new Error("You are not authenticated")
              err.status = 401
              res.setHeader("WWW-Authenticate", "Basic")
              next(err)
            }
          }
            else {
              if(req.signedCookies.user === 'admin'){
                next()
              }
              else {
                const err = new Error("you are not authenticated")
                err.status = 401
                next(err)
              }
            }
          
        }
      
      
      app.use(auth)
      













      router.post("/login", (req, res, next) => {
        if(!req.session.user){
          var authHeader = req.headers.authorization
      
          if(!authHeader){
            var err = new Error("you are not authenticated")
            err.status = 403
            res.setHeader("WWW-Authenticate", "Basic")
            return next(err)
          }
          const auth = new Buffer.from(authHeader.split(" "[1], 'base64')).toString().split(":")
          const username = auth[0]
          const password = auth[1]
      
          User.findOne({username: username})
            .then((user) => {
              if(user === null){
                const err = new Error(`user ${username} doesn't exist`)
                err.status = 403
                return next(err)
      
              }
              else if( user.password != password){
                const err = new Error(`Your password incorrect`)
                err.status = 403
                return next(err)
              }
              else if(user.username === username && user.password === password){
                req.session.user = 'authenticated'
                res.statusCode = 200
                res.setHeader("Content-Type", "text/plain")
                res.end("You are authenticated")
              }
            }).catch((err) => next(err))
      
      
        }
        else {
          res.statusCode = 200
          res.setHeader("Content-Type", "text/plain")
          res.end("you are already authenticated")
        }
      })






      





