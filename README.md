# Mini-Single-Spa-Demo

## Version 1

In this version, we will register some applications and change their status to load themselves.

### Listen to routing addresses

We can load an application by rewriting pushState and replaceState methods, and we can also monitor changes to the route path to reload the application every time the route is switched.

### Register application

After initializing the application, change the status to BEFORE_BOOTSTRAP and handle the route rules.

### Bootstrap application

In the Bootsrtap lifecycle,we need to initialize this application,and retrieve the bootstrap,mount and unmount methods from the application's loadApp function.We should then use these methods as lifecycle methods for the application.Additionally, we need to initialize the application's props,which will be used as parameters with the bootstrap method.Finally we can obtain the result of the bootstrap method,we need to check the result type,and transform the result to a Promise object,after that we should call the then method of the object to change the application's status to BOOTSTRAP.

### Update status

#### Mount application

In this step, we can mount the application and execute the mount method of the application. Next, we will convert the obtained result into a Promise object and call the then method of the object to change the application's state to Mounted

#### Unmount application

Contrary to mount,in this setp,we need to unmount this application and change the status from MOUNTED to UNMOUNTED

## Version 2

In this version ,we need to achieve a goal to loading the static resource,such as js , css , and html
