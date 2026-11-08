import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import { categories } from "@/config/categories";

Vue.use(VueRouter);

const siteName = "Jewelry Pix 豬寶盒";
const defaultDescription =
  "Jewelry Pix 豬寶盒嚴選耳環、戒指、項鍊、手鍊、耳夾耳環與 925 銀飾，讓你以剛剛好的價格，找到適合日常穿搭的質感飾品。";

function updateMetaTag(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

const router = new VueRouter({
  mode: "hash",
  linkActiveClass: "active",
  routes: [
    {
      path: "",
      component: () => import("@/layouts/FrontendLayout.vue"),
      meta: {
        title: "首頁",
        breadcrumb: true,
      },
      children: [
        {
          path: "/",
          component: () => import("@/views/frontend/HomeView.vue"),
          meta: {
            title: "首頁",
            description: defaultDescription,
            breadcrumb: true,
          },
        },
        {
          name: "關於我們",
          path: "about",
          component: () => import("@/views/frontend/AboutView.vue"),
          meta: {
            title: "關於我們",
            description:
              "認識 Jewelry Pix 豬寶盒。我們嚴選兼具設計感與高 CP 值的飾品，讓每個人都能自在展現自己的日常風格。",
            breadcrumb: true,
          },
        },
        {
          name: "飾品保養",
          path: "jewelry-care",
          component: () => import("@/views/frontend/JewelryCareView.vue"),
          meta: {
            title: "飾品保養",
            description:
              "Jewelry Pix 飾品保養指南，帶你認識 925 純銀、合金與鋼飾的日常清潔與收納方式，延長飾品陪伴你的時間。",
            breadcrumb: true,
          },
        },
        {
          name: "購物須知",
          path: "shopping-guide",
          component: () => import("@/views/frontend/ShoppingGuideView.vue"),
          meta: {
            title: "購物須知",
            description:
              "Jewelry Pix 購物須知：了解商品訂購、付款、出貨、退貨與售後服務流程，安心選購喜歡的飾品。",
            breadcrumb: true,
          },
        },
        {
          name: "隱私權條款",
          path: "privacy",
          component: () => import("@/views/frontend/PrivacyView.vue"),
          meta: {
            title: "隱私權條款",
            description:
              "Jewelry Pix 隱私權條款，說明個人資料蒐集、使用、保護與 Cookie 使用方式。",
            breadcrumb: true,
          },
        },
        {
          path: "/store",
          component: () => import("@/layouts/StoreLayout.vue"),
          meta: {
            title: "商店",
            breadcrumb: true,
          },
          children: [
            {
              name: "商店",
              path: "",
              component: () => import("@/views/frontend/StoreView.vue"),
              meta: {
                title: "商店",
                description:
                  "探索 Jewelry Pix 豬寶盒全系列飾品：耳環、戒指、項鍊、手鍊、耳夾耳環、水晶手環與 925 銀飾。",
                breadcrumb: true,
              },
            },
            {
              name: "商品分類",
              path: ":slug",
              component: () => import("@/views/frontend/CategoryView.vue"),
              meta: {
                breadcrumb: true,
              },
            },
          ],
        },
        {
          name: "購物車",
          path: "carts",
          component: () => import("@/views/frontend/CartsView.vue"),
          meta: {
            title: "購物車",
            robots: "noindex, nofollow",
            breadcrumb: true,
          },
        },
        {
          name: "結帳",
          path: "checkout/:orderId",
          component: () => import("@/views/frontend/CheckoutView.vue"),
          meta: {
            title: "結帳",
            robots: "noindex, nofollow",
            breadcrumb: true,
          },
        },
        {
          name: "登入",
          path: "/login",
          meta: {
            title: "會員登入",
            robots: "noindex, nofollow",
          },
          component: () => import("@/views/frontend/LoginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layouts/BackendLayout.vue"),
      redirect: "/admin/products",
      meta: {
        requiresAuth: true,
        robots: "noindex, nofollow",
      },
      children: [
        {
          name: "Products",
          path: "products",
          meta: {
            requiresAuth: true,
          },
          component: () => import("@/views/backend/ProductsView.vue"),
        },
        {
          name: "Orders",
          path: "orders",
          meta: {
            requiresAuth: true,
          },
          component: () => import("@/views/backend/OrdersView.vue"),
        },
        {
          name: "Coupons",
          path: "coupons",
          meta: {
            requiresAuth: true,
          },
          component: () => import("@/views/backend/CouponsView.vue"),
        },
      ],
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "商品分類") {
    const category = categories.find((item) => item.slug === to.params.slug);

    if (!category) {
      return next("/store");
    }
  }
  if (
    to.matched.some((item) => {
      return item.meta.requiresAuth;
    })
  ) {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!token) {
      return next("/login");
    }
    const api = `${process.env.API_URL}/v2/api/user/check`;
    try {
      const res = await axios.post(
        api,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.success) {
        next();
      } else {
        next("/login");
      }
    } catch (error) {
      next("/login");
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  const matchedRoutes = to.matched.slice().reverse();
  const pageRoute = matchedRoutes.find(
    (route) => route.meta && route.meta.title
  );
  const robotsRoute = matchedRoutes.find(
    (route) => route.meta && route.meta.robots
  );
  const title = pageRoute ? pageRoute.meta.title : "首頁";
  const description =
    pageRoute && pageRoute.meta.description
      ? pageRoute.meta.description
      : defaultDescription;
  const url = window.location.href;

  document.title = `${title}｜${siteName}`;
  updateMetaTag("name", "description", description);
  updateMetaTag(
    "name",
    "robots",
    robotsRoute ? robotsRoute.meta.robots : "index, follow"
  );
  updateMetaTag("property", "og:title", document.title);
  updateMetaTag("property", "og:description", description);
  updateMetaTag("property", "og:url", url);
  updateMetaTag("property", "og:type", "website");
  updateMetaTag("name", "twitter:title", document.title);
  updateMetaTag("name", "twitter:description", description);
  updateCanonical(url);
});

export default router;
