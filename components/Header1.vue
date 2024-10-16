<template>
  <div class="container-fluid">
    <nav>
      <div class="content flex_space">
        <div class="logo">
          <img src="/assets/img/logow.png">
        </div>
      </div>
    </nav>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');


*{
padding: 0;
margin: 0;
box-sizing: border-box;
}

a {
text-decoration: none;
}

.flex {
display: flex;
}

.flex_space {
display: flex;
justify-content: space-between;
}


.container {
max-width: 85%;
margin: auto;
}

header
nav {
height: 10vh;
line-height: 10vh;
padding: 0 20px;
}

nav img {
margin: 10px 2px;
height: 50px;
width: 150px;
}

nav ul {
display: inline-block;
}

nav ul li {
display: inline-block;
text-transform: uppercase;
}

nav ul li a {
color: #000;
margin: 0 10px;
transition: 0.5s;
}

nav ul li a:hover {
color: #915e5e;
}

nav i {
margin: 30px 20px;
}

nav button {
padding: 13px 40px;
}

nav .navlinks span {
display: none;
}
</style>