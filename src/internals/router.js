import { onMounted, ref } from "../deps/vue.js";

export const parseHash = (hash) => hash.replace(/#/g, "").split("_");

export const formatHash = (route) => route.join("_");

const removeHash = () =>
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );

// export const router = ref(["", ""]);

export const toc = ref([]);

export const useRouter = () => {
  const router = ref(["", ""]);

  if (location.hash) {
    router.value = parseHash(location.hash);
  }

  window.addEventListener(
    "click",
    (e) => {
      if (e.target.tagName === "A" && e.target.hash) {
        e.preventDefault();
        //toc.value = [];
        router.value = parseHash(e.target.hash);
        if (router.value[0]) {
          location.hash = formatHash(router.value, true);
        } else {
          removeHash();
        }
        if (router.value[1]) {
          const target = document.getElementById(formatHash(router.value));
          window.scrollTo({
            left: 0,
            top: target.offsetTop - 10,
            behavior: "smooth",
          });
        }
      }
    },
    { capture: true }
  );

  window.addEventListener("popstate", (e) => {
    const parsedHash = parseHash(location.hash);
    if (
      router.value[0] !== parsedHash[0] ||
      router.value[1] !== parsedHash[1]
    ) {
      router.value = parsedHash;
    }
  });

  return router;
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting && entry.intersectionRatio === 1) {
  //         router.value[1] = parseHash(entries[0].target.id)[1];
  //       }
  //     });
  //   },
  //   { threshold: 1 }
  // );

  // onMounted(() => {
  //   toc.value.forEach(({ anchor }) => {
  //     observer.observe(document.getElementById(anchor));
  //   });
  // });

  // onUnmounted(() => observer.disconnect());
};
