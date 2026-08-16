/* =========================================
   GuyZ.Design — Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavScroll();
    initMobileNav();
    initActiveNav();
    initAnimations();
    initSmoothScroll();
    initCopyWechat();
});

/* --- 主题切换 --- */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggle.checked = true;
    } else if (savedTheme === 'dark') {
        toggle.checked = false;
    } else {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        toggle.checked = prefersLight;
    }

    document.documentElement.setAttribute('data-theme', toggle.checked ? 'light' : 'dark');

    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    });
}

/* --- 导航高亮 --- */
function initActiveNav() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    if (!navLinks.length) return;

    const current = document.body.getAttribute('data-current');
    if (current) {
        const match = navLinks.find(link => link.getAttribute('href')?.includes(current));
        if (match) match.classList.add('active');
        return;
    }

    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const setActiveById = (id) => {
        navLinks.forEach(link => link.classList.remove('active'));
        const match = navLinks.find(link => link.getAttribute('href') === `#${id}`);
        if (match) match.classList.add('active');
    };

    const onScroll = () => {
        const offset = 120;
        let currentId = sections[0]?.id;
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top + window.scrollY - offset;
            if (window.scrollY >= top) {
                currentId = section.id;
            }
        });
        if (currentId) setActiveById(currentId);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* --- 导航滚动效果 --- */
function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;
    const threshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > threshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* --- 移动端导航 --- */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // 点击链接关闭菜单
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* --- 滚动动画 --- */
function initAnimations() {
    // Hero 入场动画
    const heroElements = document.querySelectorAll('.animate-in');
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // 滚动出现动画
    const revealElements = document.querySelectorAll('.service-card, .case-card, .case-section, .bottom-cta-inner, .contact-card');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(el);
    });
}

/* --- 平滑滚动 --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* --- 微信号复制 --- */
function initCopyWechat() {
    const wechatId = document.querySelector('.wechat-id');
    if (!wechatId) return;

    wechatId.addEventListener('click', () => {
        const id = wechatId.getAttribute('data-wechat');
        if (!id) return;

        navigator.clipboard.writeText(id).then(() => {
            const hint = wechatId.querySelector('.copy-hint');
            const original = hint.textContent;
            hint.textContent = '已复制 ✓';
            hint.style.color = 'var(--color-green)';

            setTimeout(() => {
                hint.textContent = original;
                hint.style.color = '';
            }, 2000);
        }).catch(() => {
            // fallback
            const textarea = document.createElement('textarea');
            textarea.value = id;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    });
}
