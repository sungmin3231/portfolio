"use strict";

// navbar height값에따라 css값 적용 및 해제
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// navbarMenu 선택시 이동
const navbarmenu = document.querySelector(".navbar__menu");
navbarmenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  navbarmenu.classList.remove("open");
  scrollIntoView(link);
});

// navbarToggle
const navbarToggleBtn = document.querySelector(".navbar__toggle");
navbarToggleBtn.addEventListener("click", () => {
  navbarmenu.classList.toggle("open");
});

// 아래로 스크롤됨에 따라 천천히 투명하게 만들기
const home = document.querySelector("#home .section__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// arrow--up opacity값 적용 및 해제
const arrowUp = document.querySelector(".arrow--up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// arrow--up button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workCtgContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workCtgContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // category button selected설정
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킴

const sectionIds = ["#home", "#about", "#skill", "#work", "#contact"];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

// button 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      //   스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// home text about me photo text move
const textImgItems = [
  ".text-typing",
  ".text_left",
  ".text_right",
  ".about__info__left img",
  ".about__info__profile",
  ".about__info__history",
];
const textImgLists = textImgItems.map((id) => document.querySelector(id));

const textImgOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const textImgCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("move");
    } else {
      entry.target.classList.remove("move");
    }
  });
};
const textImgObserver = new IntersectionObserver(
  textImgCallback,
  textImgOption
);

textImgLists.forEach((textImgList) => textImgObserver.observe(textImgList));

// skill

const skills = document.querySelectorAll(".skill__value");
const skillOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const skillCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("move");
    } else {
      entry.target.classList.remove("move");
    }
  });
};

const skillObserver = new IntersectionObserver(skillCallback, skillOption);
skills.forEach((skill) => skillObserver.observe(skill));
