class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }

class File {
    constructor(name, content) {
      this.name = name;
      this.content = content;
      this.createdAt = new Date();
    }
  
    getSize() {
      return this.content.length;
    }
  }
  
  class Directory {
    constructor(name) {
      this.name = name;
      this.files = [];
      this.folders = [];
    }
  
    addFile(file) {
      this.files.push(file);
    }
  
    findFile(name) {
      return this.files.find((file) => file.name === name);
    }
  
    addFolder(folder) {
      folder.parent = this;
      this.folders.push(folder);
    }
  
    findFolder(name) {
      return this.folders.find((folder) => folder.name === name);
    }
  
    remove(fileOrFolder) {
      if (fileOrFolder instanceof File) {
        this.files = this.files.filter((file) => file !== fileOrFolder);
      } else if (fileOrFolder instanceof Directory) {
        this.folders = this.folders.filter((folder) => folder !== fileOrFolder);
      }
    }

    getFullPath() {
        if (this.parent) {
          return this.parent.getFullPath() + '/' + this.name;
        } else {
          return '/' + this.name;
        }
      }

  }
  
  class FileSystem {
    constructor() {
      this.root = new Directory('/');
      this.currentDirectory = this.root;
      this.currentUser = null;
      this.users = [];

    }

    getUser() {
        return this.currentUser
    }
    createUser(username, password) {
        console.log('create user')
        const userExist = this.users.find(user => user.username === username && user.password === password) 
        if(userExist) {
            console.log('El usuario ya existe')
        } else {
            const user = new User(username, password);
            this.users.push(user);
            console.log(`Usuarios ${username} creado exitosamente`)
        }
    }

    login(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if(user) {
            this.currentUser = user;
            console.log(`Usuario ${username} logueado exitosamente`)
        } else {
            console.log('El usuario o contraseña es incorrecto')
        }
    }

    whoami() {
        if (this.currentUser) {
          console.log(`Usuario actual: ${this.currentUser.username}`);
          return true
        } else {
          console.log('Ningún usuario logueado.');
          return false
        }
      }
  
    createFile(name, content) {
      const file = new File(name, content);
      this.currentDirectory.addFile(file);
      console.log(` Archivo ${file.name} guardado `)
    }
  
    showFile(name) {
      const file = this.currentDirectory.findFile(name);
      if (file) {
        console.log(file.content);
      } else {
        console.log(`El archivo '${name}' no existe.`);
      }
    }
  
    showMetadata(name) {
      const file = this.currentDirectory.findFile(name);
      if (file) {
        console.log(`Nombre: ${file.name}`);
        console.log(`Fecha de creación: ${file.createdAt}`);
        console.log(`Tamaño: ${file.getSize()} bytes`);

        console.log(`Contenido:`);
        console.log(file.content);

      } else {
        console.log(`El archivo '${name}' no existe.`);
      }
    }
  
    createFolder(name) {
      const folder = new Directory(name);
      this.currentDirectory.addFolder(folder);
      console.log(`Se creo la carpeta ${folder.name}`)
    }
  
    changeDirectory(name) {
      if (name === '..') {
        if (this.currentDirectory.parent) {
          this.currentDirectory = this.currentDirectory.parent;
          console.log(this.currentDirectory.name)
        } else {
          console.log('Ya estás en la raíz.');
        }
      } else {
        const folder = this.currentDirectory.findFolder(name);
        if (folder) {
          this.currentDirectory = folder;
        } else {
          console.log(`La carpeta '${name}' no existe.`);
        }
      }
    }
  
    destroy(name) {
      const fileOrFolder = this.currentDirectory.findFile(name) || this.currentDirectory.findFolder(name);
      if (fileOrFolder) {
        this.currentDirectory.remove(fileOrFolder);
        console.log(`Se elimino ${fileOrFolder.name}`)
      } else {
        console.log(`El archivo o carpeta '${name}' no existe.`);
      }
    }
  
    listContents() {
      console.log('Archivos:');
      this.currentDirectory.files.forEach((file) => console.log(`- ${file.name}`));
  
      console.log('Carpetas:');
      this.currentDirectory.folders.forEach((folder) => console.log(`- ${folder.name}`));
    }
  
    printCurrentDirectory() {
        const fullPath = this.currentDirectory.getFullPath();
        console.log(`Ruta actual: ${fullPath}`)
    }
  }

  function startConsole() {
    const fileSystem = new FileSystem();
  
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (input) => {
      const command = input.trim();
  
      if (command === 'exit') {
        console.log('Saliendo de la consola.');
        process.exit(0);
      } else {
        executeCommand(command); 
      }
    });
  

    function executeCommand(command) {
      const [action, ...args] = command.split(' ');
  
      const checkUser = ()=> fileSystem.getUser()

    if (action === 'create_user') {
        const [username, password] = args;
        fileSystem.createUser(username, password);
        return
    }
    
    if (action === 'login') {
        const [username, password] = args;
        fileSystem.login(username, password);
        return 
    }

    if (action === 'whoami') {
        fileSystem.whoami();
        return
    } 
    
    if (action === 'create_file' && checkUser()) {
        const [name, ...contentParts] = args;
        let content = contentParts.join(' ');
        content = content.substring(1, content.length - 1);
        fileSystem.createFile(name, content);
        return
    }
    
    if (action === 'show' && checkUser()) {
        const [name] = args;
        fileSystem.showFile(name);
        return
    }
    
    if (action === 'metadata' && checkUser()) {
        const [name] = args;
        fileSystem.showMetadata(name)
        return
    }
    
    if (action === 'create_folder' && checkUser()) {
        const [name] = args;
        fileSystem.createFolder(name)
        return
    }
    
    if (action === 'cd' && checkUser()) {
        const [name] = args;
        fileSystem.changeDirectory(name)
        return
    }
    
    if (action === 'destroy' && checkUser()) {
        const [name] = args;
        fileSystem.destroy(name)
        return
    }
    
    if (action === 'ls' && checkUser()) {
        fileSystem.listContents()
        return
     }
      
    if (action === 'whereami' && checkUser()) {
        fileSystem.printCurrentDirectory()
        return
    }

    if(!checkUser()) {
        console.log('Debe iniciar sesion para utilizar los comandos')
        return
    }

    console.log('Comando no válido. Intente nuevamente.');
     
    }
    console.log('Consola interactiva iniciada. Ingrese comandos:');
  }

  startConsole();




