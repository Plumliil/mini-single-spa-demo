# Mini-Single-Spa-Demo

### Listen to routing addresses


通过重写 pushState 和 replaceState 方法来进行应用加载,并且监听路由地址的改变加载应用

每次路由切换时都需要重新加载应用

### Register application

在此注册应用,改变应用状态为启动前,对路由规则进行处理

### Bootstrap application

in the Bootsrtap lifecycle,we need to initialize this application,and retrieve the bootstrap,mount and unmount methods from the application's loadApp function.We should then use these methods as lifecycle methods for the application.Additionally, we need to initialize the application's props,which will be used as parameters with the bootstrap method.Finally we can obtain the result of the bootstrap method,we need to check the result type,and transform the result to a Promise object,after that we should call the then method of the object to change the application's status to BOOTSTRAP.

### Update status

#### Mount application

In this step, we can mount the application and execute the mount method of the application. Next, we will convert the obtained result into a Promise object and call the then method of the object to change the application's state to Mounted

#### Unmount application

Contrary to mount,in this setp,we need to unmount this application and change the status from MOUNTED to UNMOUNTED
