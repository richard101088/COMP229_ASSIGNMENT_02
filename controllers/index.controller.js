//Index Controller functions are from the router

exports.home = function(req, res, next) {
  console.log('===> Original URL: ' + req.session.url);
  res.render('Home', { 
      title: 'Home',
      userName: req.user ? req.user.username : ''
  });
};

exports.about = function(req, res, next) {
  res.render('about', { 
      title: 'About',
      userName: req.user ? req.user.username : ''
   });
}

exports.projects = function(req, res, next) {
  res.render('projects', { 
    title: 'Projects',
    userName: req.user ? req.user.username : '' 
  });
}