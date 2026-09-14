(function () {
  const cfg = window.BABYCATE || {};
  const ca = (cfg.contract || "").trim();
  const dexBase = cfg.dexBase || "https://dexscreener.com/solana";
  const dexUrl = ca ? dexBase + "/" + ca : dexBase;
  const pumpUrl = ca
    ? "https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=" + ca
    : cfg.pumpswap || "https://swap.pump.fun/";
  const embed =
    dexUrl +
    "?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=light&theme=light&chartStyle=0&chartType=usd&interval=15";

  document.querySelectorAll(".js-dex").forEach(function (el) {
    el.href = dexUrl;
  });
  document.querySelectorAll(".js-pumpswap").forEach(function (el) {
    el.href = pumpUrl;
  });

  const frame = document.querySelector(".js-dex-embed");
  if (frame) frame.src = embed;

  const chip = document.querySelector("[data-copy]");
  const value = document.querySelector(".ca-value");
  if (value) value.textContent = ca || "Soon";
  if (chip) {
    chip.addEventListener("click", async function () {
      const text = ca || "BABYCATE";
      try {
        await navigator.clipboard.writeText(text);
        value.textContent = "Copied";
        setTimeout(function () {
          value.textContent = ca || "Soon";
        }, 1400);
      } catch (err) {
        value.textContent = text;
      }
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const portrait = document.querySelector(".hero-portrait");
  if (portrait && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", function (event) {
      const x = (event.clientX / window.innerWidth - 0.5) * 16;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      portrait.style.transform = "translate(" + x + "px," + y + "px)";
    });
  }
})();
