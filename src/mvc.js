const model = {
  isAdminVisible: false,
  currentcat: null,
  cats: [
    {
      name: "cat1",
      img:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnklMjBjYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
      counter: 0
    },
    {
      name: "cat2",
      img: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg",
      counter: 5
    },
    {
      name: "cat3",
      img:
        "https://media.istockphoto.com/photos/kitten-at-home-garden-wall-picture-id1273661469?b=1&k=20&m=1273661469&s=170667a&w=0&h=K-b-88J89oSBIwbD0WhhDoOvybcbjfePJoOHS0grHHA=",
      counter: 10
    },
    {
      name: "cat4",
      img:
        "https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-superJumbo.jpg",
      counter: 15
    },
    {
      name: "cat5",
      img:
        "https://images.unsplash.com/photo-1615807713086-bfc4975801d0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      counter: 20
    }
  ]
};

// -------------------------------------------
const controller = {
  init: function () {
    model.currentcat = model.cats[1];

    buttonview.init();
    photoview.init();
    adminView.init();
  },
  getCurrentCat: function () {
    return model.currentcat;
  },
  getAllCats: function () {
    return model.cats;
  },
  setCurrentCat: function (cat) {
    model.currentcat = cat;
  },
  incrementCounter: function () {
    model.currentcat.counter++;
    photoview.render();
    adminView.render();
  },
  openAdmin: function () {
    model.isAdminVisible = true;
    adminView.render();
  },
  closeAdmin: function () {
    model.isAdminVisible = false;
    adminView.render();
  },
  updateinfo: function (Catname, Catimgurl, clicksNos) {
    model.currentcat.name = Catname;
    model.currentcat.img = Catimgurl;
    model.currentcat.counter = clicksNos;
    buttonview.update();
    photoview.render();
    adminView.render();
  }
};

// -------------------------------------------

function callback(catobject) {
  let catobj = catobject;
  return function () {
    controller.setCurrentCat(catobj);
    photoview.render();
    adminView.render();
  };
}

const buttonview = {
  init: function () {
    this.buttons = document.getElementById("buttons");
    this.render();
  },
  render: function () {
    controller.getAllCats().forEach((item) => {
      let btn = document.createElement("button");
      btn.classList = "cats";
      btn.textContent = item.name;
      btn.addEventListener("click", callback(item));
      this.buttons.appendChild(btn);
      console.log(this.buttons)
    });
  },
  update:function(){

    this.buttons.innerHTML=""
    this.render()
  }
};

// -------------------------------------------

const photoview = {
  init: function () {
    this.img = document.getElementById("catpic");
    this.name = document.getElementById("catname");
    this.img.addEventListener("click", function () {
      controller.incrementCounter();
    });
    this.counter = document.getElementById("countprint");
    this.render();
  },
  render: function () {
    this.img.src = controller.getCurrentCat().img;
    this.counter.textContent = controller.getCurrentCat().counter;
    this.name.textContent = controller.getCurrentCat().name;
  }
};
// -------------------------------------------------------
const adminView = {
  init: function () {
    this.admin = document.getElementById("admin");
    this.form = document.getElementById("form");
    this.name = document.getElementById("name");
    this.imgurl = document.getElementById("imgurl");
    this.clicks = document.getElementById("clicks");
   
    document.getElementById("save").addEventListener("click", function (e) {
     
      e.preventDefault();
     adminView.change()
    });
    document.getElementById("cancel").addEventListener("click", function (e) {
      e.preventDefault();
      controller.closeAdmin();
    });

    this.admin.addEventListener("click", function () {
      controller.openAdmin();
    });

    this.render();
  },
  change: function () {
    controller.updateinfo(this.name.value, this.imgurl.value, this.clicks.value);
  },

  render: function () {
    this.form.style.display = `${model.isAdminVisible ? "block" : "none"}`;
    this.name.value = controller.getCurrentCat().name;
    this.imgurl.value = controller.getCurrentCat().img;
    this.clicks.value = controller.getCurrentCat().counter;
  }
};

controller.init();
