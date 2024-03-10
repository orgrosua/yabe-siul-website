<script setup>
import { ref, watch, computed, onBeforeMount, onMounted } from 'vue';
import { Rive } from '@rive-app/canvas';

/** @type {Rive} */
let pupRive = null;
const koFiHovered = ref(false);

const pupRiveCanvas = ref(null);

const isMobileMenuOpen = ref(false);

const happyCustomers = ref(0);
const activeSites = ref(0);
const totalDownloads = ref(0);

const wp_v10 = ref({});
const wp_v12 = ref({
    version: '1.0.x',
    active_installs: 0,
    donate_link: 'https://ko-fi.com/Q5Q75XSF7',
    download_link: '/#pricing',
});

const TESTIMONIALS = [
    {
        createdAt: '2023-02-05',
        submitterName: 'Ramiro Martin Alonso',
        submitterAvatar: 'https://secure.gravatar.com/avatar/8ece04c0d5d93d8f32766d72182d6c63?s=100',
        submitterTitle: 'E4 Market Services',
        message: `I have purchased Yabe Siul, and my first impressions have left me pleasantly surprised, it is an advanced complement, it works very fast and precise, I am very happy to have purchased it, I recommend it 100%`
    },
    {
        createdAt: '2024-02-22',
        submitterName: 'Angel Julian Mena',
        submitterAvatar: 'https://s.gravatar.com/avatar/862747ad39a43ba17370e55e9532986b?s=100',
        submitterTitle: 'flowtitude.com',
        message: `I am truly very happy that Joshua created SIUL, I am working with him and migrating my previous work from tailwind. It works very well and the support they provide is first class…`
    },
    {
        createdAt: '2024-02-29',
        submitterName: 'Daniel Maurel',
        submitterAvatar: 'https://s.gravatar.com/avatar/d6832b181ad8c7e14a775ab149fa2a1d?s=100',
        submitterTitle: '',
        message: `Yabe Siul is a game-changer! Tailwind CSS customization and browser-based compilation simplify my work!!`
    },
    {
        createdAt: '2024-03-07',
        submitterName: 'Daniel Snell',
        submitterAvatar: 'https://s.gravatar.com/avatar/c62179cf3cb331ccd7504e321ed8b0e0?s=100',
        submitterTitle: 'Artisan Studios, Inc',
        message: `Yabe Siul, crafted by Joshua, has simplified my Tailwind CSS work with its browser-based compilation, blending ease with flexibility. Joshua's responsive support enriches this seamless experience, making development feel personal and efficient.`
    },
];

const AS_SEEN_ON = [
    // {
    //     name: 'some-publisher',
    //     url: 'https://some-publisher.com/',
    //     logo: '../assets/landing/as-seen-on-some-publisher.png',
    // },
];

const VISUAL_BUILDERS = [
    {
        name: 'Gutenberg',
        url: '/guides/integrations/gutenberg',
        icon: 'assets/landing/builder-gutenberg.svg',
    },
    {
        name: 'Blockstudio',
        url: '/guides/integrations/blockstudio',
        icon: 'assets/landing/builder-blockstudio.svg',
        pro: true,
    },
    {
        name: 'Bricks',
        url: '/guides/integrations/bricks',
        icon: 'assets/landing/builder-bricks.svg',
        pro: true,
    },
    {
        name: 'LiveCanvas',
        url: '/guides/integrations/livecanvas',
        icon: 'assets/landing/builder-livecanvas.png',
        pro: true,
    },
    {
        name: 'Oxygen',
        url: '/guides/integrations/oxygen',
        icon: 'assets/landing/builder-oxygen.svg',
        pro: true,
    },
    {
        name: 'Timber',
        url: '/guides/integrations/timber',
        icon: 'assets/landing/builder-timber.svg',
        pro: true,
    },
    {
        name: 'Plugins & Themes Dev',
        url: '/guides/integrations/developer',
        icon: 'assets/landing/builder-wordpress.svg',
    },
];

const PRICING = [
    // {
    //     duration: 'year',
    //     amount: 0,
    //     isMostPopular: false,
    //     isEmphasized: false,
    //     title: 'Starter',
    //     subtitle: 'Get started with the free version and enjoy the full features',
    //     features: [
    //         'All features',
    //         {
    //             icon: 'fa-regular fa-asterisk',
    //             text: 'Limited integrations'
    //         },
    //         {
    //             icon: 'fa-regular fa-planet-ringed',
    //             text: 'Unlimited personal sites'
    //         },
    //         {
    //             icon: 'fa-regular fa-planet-ringed',
    //             text: 'Unlimited client sites'
    //         },
    //         {
    //             icon: 'fa-solid fa-rotate',
    //             text: 'Free updates'
    //         },
    //         {
    //             icon: 'fa-solid fa-messages',
    //             text: 'Community support'
    //         },
    //     ],
    //     purchaseButton: {
    //         text: 'Download',
    //         url: 'https://wordpress.org/plugins/yabe-siul',
    //     },
    // },
    {
        duration: 'year',
        amount: 19,
        isMostPopular: false,
        isEmphasized: false,
        title: 'Personal',
        subtitle: 'Best for blogger, individual & solopreneur',
        features: [
            'All features',
            'All integrations',
            {
                icon: 'fa-regular fa-planet-ringed',
                text: 'Unlimited personal sites'
            },
            {
                icon: 'fa-solid fa-rotate',
                text: 'Free updates'
            },
            {
                icon: 'fa-solid fa-headset',
                text: 'Standard support'
            },
        ],
        purchaseButton: { url: 'https://rosua.org/checkout/?edd_action=add_to_cart&download_id=2250&edd_options[price_id]=1' },
    },
    {
        duration: 'year',
        amount: 39,
        isMostPopular: true,
        isEmphasized: false,
        title: 'Agency',
        subtitle: 'Perfect For Agency Owners with high volume',
        features: [
            'All features',
            'All integrations',
            {
                icon: 'fa-regular fa-planet-ringed',
                text: 'Unlimited personal sites'
            },
            {
                icon: 'fa-regular fa-planet-ringed',
                text: 'Unlimited client sites'
            },
            {
                icon: 'fa-solid fa-rotate',
                text: 'Free updates'
            },
            {
                icon: 'fa-solid fa-headset',
                text: 'Standard support'
            },
        ],
        purchaseButton: { url: 'https://rosua.org/checkout/?edd_action=add_to_cart&download_id=2250&edd_options[price_id]=2' },
    },
    {
        duration: 'one-time',
        amount: 79,
        isMostPopular: false,
        isEmphasized: false,
        title: 'Personal',
        subtitle: 'Best for blogger, individual & solopreneur',
        features: [
            'All features',
            'All integrations',
            {
                icon: 'fa-regular fa-planet-ringed',
                text: 'Unlimited personal sites'
            },
            {
                icon: 'fa-solid fa-rotate',
                text: 'Free updates'
            },
            {
                icon: 'fa-solid fa-headset',
                text: 'Standard support (first year)'
            },
        ],
        purchaseButton: { url: 'https://rosua.org/checkout/?edd_action=add_to_cart&download_id=2250&edd_options[price_id]=3' },
    },
    {
        duration: 'one-time',
        amount: 159,
        isMostPopular: false,
        isEmphasized: true,
        title: 'Agency',
        subtitle: 'Perfect For Agency Owners with high volume',
        features: [
            'All features',
            'All integrations',
            {
                icon: 'fa-regular fa-planet-ringed',
                text: 'Unlimited personal sites'
            },
            {
                icon: 'fa-regular fa-planet-ringed',
                text: 'Unlimited client sites'
            },
            {
                icon: 'fa-solid fa-rotate',
                text: 'Free updates'
            },
            {
                icon: 'fa-solid fa-headset',
                text: 'Standard support (first year)'
            },
        ],
        purchaseButton: { url: 'https://rosua.org/checkout/?edd_action=add_to_cart&download_id=2250&edd_options[price_id]=4' },
    },
];


const randomizeTestimonials = computed(() => {
    return TESTIMONIALS;
});

// available pricing duration: year, one-time
const selectedPricingDuration = ref('year');

const availablePricing = computed(() => {
    return PRICING.filter(item => item.duration === selectedPricingDuration.value);
});

watch(koFiHovered, (value) => {
    pupRive.stateMachineInputs('YeyMachine')[0].value = value;
});

watch(isMobileMenuOpen, (newState, oldState) => {
    if (newState) {
        setTimeout(() => {
            // auto close the mobile nav when menu item is clicked
            const mobileNavLinks = document.querySelectorAll('.mobile-menu__link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    isMobileMenuOpen.value = false;
                });
            });
        }, 100);
    }
});

onBeforeMount(() => {
    fetch('https://rosua.org/wp-json/rosua-edd/v1/stats/total_users')
        .then(res => res.json())
        .then(res => {
            happyCustomers.value += res[0].count_users;
        })
        .catch(err => {
            console.log(err);
        });

    fetch('https://rosua.org/wp-json/rosua-edd/v1/stats/total_sites')
        .then(res => res.json())
        .then(res => {
            // search array of object with download_id = 2250 (Yabe Siul)
            const download = res.find(item => item.download_id === 2250);
            activeSites.value += download.count_sites;
            totalDownloads.value += download.count_sites;
        })
        .catch(err => {
            console.log(err);
        });

    // fetch('https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&slug=yabe-siul')
    //     .then(response => response.json())
    //     .then(data => {
    //         wp_v12.value = data;
    //         activeSites.value += wp_v12.value.active_installs;
    //     });
    // fetch('https://api.wordpress.org/plugins/info/1.0/yabe-siul.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         wp_v10.value = data;
    //         totalDownloads.value += wp_v10.value.downloaded;
    //     });
});

onMounted(() => {
    setTimeout(() => {
        // if hash is not empty, scroll to the element
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);

            if (el) {
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }
    }, 100);

    pupRive = new Rive({
        src: 'https://cdn.jsdelivr.net/gh/orgrosua/yabe-webfont-docs/public/assets/landing/pup.riv',
        canvas: pupRiveCanvas.value,
        autoplay: true,
        stateMachines: 'YeyMachine',
        onLoad: () => {
            pupRive.resizeDrawingSurfaceToCanvas();
        },
    });

    // Refresh the lightbox when the DOM is ready
    if (window.refreshFsLightbox) {
        window.refreshFsLightbox();
    }
});
</script>
    
<template>
    <header class="sticky@md top:0 flex w:full mx:auto z:99999 bg:white justify-content:center bb:1|solid|rgba(0,0,0,0.1)">
        <div class="flex w:full max-w:screen-xl align-items:center px:32">
            <a href="/" class="flex">
                <h1 class="py:16 f:30">
                    <svg class="svg-inline--fa fill:current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M176,384H16c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16,7.2,16,16s-7.168,16-16,16 c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16c26.464,0,48-21.536,48-48S202.464,384,176,384z" />
                        </g>
                        <g>
                            <path d="M240,256c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16c8.832,0,16,7.2,16,16s-7.168,16-16,16H16 c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h224c26.464,0,48-21.536,48-48S266.464,256,240,256z" />
                        </g>
                        <g>
                            <path d="M288,32C164.288,32,64,132.288,64,256c0,10.88,1.056,21.536,2.56,32h128.192c-1.792-4.992-2.752-10.4-2.752-16 c0-26.464,21.536-48,48-48c44.096,0,80,35.904,80,80c0,44.128-35.904,80-80,80h-0.416C249.76,397.408,256,413.92,256,432 c0,16.032-4.864,30.944-13.024,43.456c14.56,2.976,29.6,4.544,45.024,4.544c123.712,0,224-100.288,224-224S411.712,32,288,32z" />
                        </g>
                    </svg>
                    Yabe Siul
                </h1>
            </a>
            <div class="mx:10"><span class="bg:green-80/.1 r:6 px:10 py:4 font:mono">v{{ wp_v12.version }}</span></div>
            <div class="flex-grow:1"></div>
            <nav class="hidden flex@md primary-nav">
                <div class="flex align-items:center mr:18">
                    <a href="/#features" class="px:15 bg:green-80/.1:hover py:8:hover r:8">Features</a>
                    <a href="/#pricing" class="px:15 bg:green-80/.1:hover py:8:hover r:8">Pricing</a>
                    <a href="/docs" class="px:15 bg:green-80/.1:hover py:8:hover r:8">Documentation</a>
                    <a href="https://www.facebook.com/groups/1142662969627943" class="px:15 bg:green-80/.1:hover py:8:hover r:8">Community</a>
                    <!-- <a class="px:15 bg:green-80/.1:hover py:8:hover r:8">Blogs</a> -->
                    <a href="https://rosua.org/checkout/order-history" class="px:15 bg:green-80/.1:hover py:8:hover r:8">Account</a>
                </div>
                <div class="flex align-items:center">
                    <a href="/#pricing" class="px:12 py:8 r:8 bg:green-80 bg:green-90:hover fg:white">Get Yabe Siul</a>
                </div>
            </nav>
            <div class="">
                <button @click="isMobileMenuOpen = true" class="block hidden@md">
                    <i class="fa-solid fa-bars f:30"></i>
                </button>
            </div>
        </div>
        <!-- Mobile Menu overlay -->
        <Transition name="mobile-nav-slide">
            <div v-if="isMobileMenuOpen" class="z:10 fixed bg:blue-20 w:full h:full">
                <button @click="isMobileMenuOpen = false" class="fixed top:20 right:20">
                    <i class="fa-solid fa-xmark f:30"></i>
                </button>
                <nav class="align-items:center flex h:full primary-nav">
                    <ul class="mobile-menu__container flex flex:col gap-y:20 mx:auto text:center">
                        <li><a href="/#features" class="mobile-menu__link">Features</a></li>
                        <li><a href="/#pricing" class="mobile-menu__link">Pricing</a></li>
                        <li><a href="/docs">Documentation</a></li>
                        <li><a href="https://www.facebook.com/groups/1142662969627943">Community</a></li>
                        <!-- <li>Blogs</li> -->
                        <li><a href="https://rosua.org/checkout/order-history">Account</a></li>
                    </ul>
                </nav>
            </div>
        </Transition>
    </header>
    <main id="main">
        <!-- Intro -->
        <div class="block-intro w:full max-w:screen-xl mx:auto flex flex:column text:center my:60">
            <!-- Headline -->
            <div class="headline px:20 mx:30 my:30 lh:1.4">
                <!-- <h1 class="title mt:55 f:30 f:38@sm f:48@md font:bold fg:#222">The <span class="bg:grass-90 r:8 px:6">GDPR-friendly</span> Font Plugin for WordPress</h1> -->
                <h1 class="title mt:55 f:30 f:38@sm f:48@md font:bold fg:#222">The <span class="bg:lime-60/.3 r:8 px:6">Tailwind CSS</span> integration for WordPress</h1>
                <p class="my:16 mx:65@md f:22 fg:gray-40">
                    Use Tailwind CSS within the block editor, page builders, plugins, and themes — no build step is required.
                </p>
            </div>
            <!-- Core Features -->
            <div class="max-w:fit-content px:32 mx:auto mt:15 mb:30">
                <div class="feature__container grid-cols:2 grid-cols:3@sm grid-cols:6@lg grid-auto-cols:auto gap-x:15 gap-y:30 gap:64@sm">

                    <div class="feature__item ">
                        <div class="feature__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33" class="">
                                <g clip-path="url(#prefix__clip0)">
                                    <path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"></path>
                                </g>
                                <defs>
                                    <clipPath id="prefix__clip0">
                                        <path fill="#fff" d="M0 0h54v32.4H0z"></path>
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div class="feature__title">
                            Tailwind CSS 3.x ready
                        </div>
                    </div>

                    <div class="feature__item">
                        <div class="feature__icon fg:gray-40 round">
                            <div class="flex ml:-35 {mr:0;ml:-15}>:not([hidden])~:not([hidden]) {inline-block;w:40;h:40}>*">
                                <i class="fa-solid fa-cloud-slash"></i>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" alt="Google Chromo logo" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" alt="Apple Safari logo" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Microsoft Edge logo" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" alt="Mozilla Firefox logo" />
                            </div>
                        </div>
                        <div class="feature__title">
                            Compile in the browser; No server is needed
                        </div>
                    </div>

                    <div class="feature__item">
                        <div class="feature__icon fg:crimson-80 round">
                            <i class="fa-light fa-face-smile-hearts"></i>
                        </div>
                        <div class="feature__title">
                            Easy to use and intuitive
                        </div>
                    </div>

                    <div class="feature__item ">
                        <div class="feature__icon fg:sky-70">
                            <i class="fa-light fa-feather"></i>
                        </div>
                        <div class="feature__title">
                            Lightweight and blazingly fast
                        </div>
                    </div>

                    <div class="feature__item ">
                        <div class="feature__icon fg:#4e6fc3">
                            <i class="fa-brands fa-wordpress"></i>
                        </div>
                        <div class="feature__title">
                            Visual builders integration
                        </div>
                    </div>

                    <div class="feature__item">
                        <div class="feature__icon fg:lime-70 round">
                            <i class="fa-solid fa-play"></i>
                        </div>
                        <div class="feature__title">
                            Zero-configuration yet customizable
                        </div>
                    </div>

                </div>
            </div>
            <!-- CTA: Get Yabe Siul Now -->
            <div class="cta my:20 flex flex:column gap:40">
                <a :href="wp_v12.download_link" class="flex gap:10 align-items:center mx:auto py:20 px:48 bg:green-80 bg:green-90:hover fg:white f:20 rounded">
                    Download Yabe Siul Now
                    <i class="fa-solid fa-arrow-right-long hidden block@3xs a:hover_{translateX(35%)} ~easing:ease ~duration:300ms"></i>
                </a>

                <div class="badges__list grid-cols:1 grid-cols:2@sm grid-cols:4@md">
                    <div class="badges__item">
                        <div class="f:24">
                            <!-- <i class="fa-solid fa-hand-holding-dollar fg:#29b077"></i> -->
                            <i class="fa-solid fa-badge-dollar fg:#29b077"></i>
                        </div>
                        <div class="f:12 text:left">
                            <strong>14-day Money</strong>
                            <br> Back Guarantee
                        </div>
                    </div>

                    <div class="badges__item">
                        <div class="f:24">
                            <i class="fa-solid fa-headset"></i>
                        </div>
                        <div class="f:12 text:left">
                            <div class="flex fg:#feb82c mb:2">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <strong>Support</strong> Quality
                        </div>
                    </div>

                    <div class="badges__item">
                        <div class="f:24 fg:crimson-80">
                            <i class="fa-solid fa-face-smile-hearts"></i>
                        </div>
                        <div class="f:12 text:left">
                            <strong> {{ happyCustomers + wp_v12.active_installs }}+ Happy</strong>
                            Users
                        </div>
                    </div>

                    <div class="badges__item">
                        <div class="f:24 fg:#4e6fc3">
                            <i class="fa-brands fa-wordpress"></i>
                        </div>
                        <div class="f:12 text:left">
                            <strong>{{ totalDownloads }}+ Download</strong> & Counting
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sponsors -->
            <div class="mx:auto my:40 flex flex:row align-items:center gap:10">
                <a href="https://github.com/sponsors/suabahasa?o=esb" target="_blank" class="github-sponsor px:16 py:5 bg:#fafbfc bg:#f3f4f6:hover font:medium lh:20px r:6 b:1|solid|rgba(27,31,35,.15) ~background-color|.2s|cubic-bezier(0.3,0,0.5,1) text:none user-select:none">
                    <i class="fa-regular fa-heart mr:8 fg:#6a737d f:16 ~transform|.15s|cubic-bezier(0.2,0,0.13,2) scale(1) .github-sponsor:hover_{scale(1.1)}"></i>
                    <span class="f:14 fg:#24292e text-align:center ">Sponsor</span>
                </a>

                <div class="rel flex gap-x:10">
                    <canvas ref="pupRiveCanvas" class="abs z:3 h:36 top:-28 right:10"></canvas>
                    <a @mouseenter="$event => koFiHovered = true" @mouseleave="$event => koFiHovered = false" :href="wp_v12.donate_link" target="_blank">
                        <img class="h:28" src="https://storage.ko-fi.com/cdn/brandasset/kofi_button_dark.png" alt="Buy Me a Coffee at ko-fi.com" />
                    </a>
                </div>
            </div>

            <!-- Snapshot -->
            <div class="mx:30@sm mx:40@md my:30 px:20">
                <div class="rel p:10">
                    <figure>
                        <img width="100%" height="100%" class="w:full h:auto r:8" src="../../../assets/landing/intro-screenshot.png" alt="">
                    </figure>
                    <!-- Watch the video -->
                    <!-- <a data-fslightbox href="https://youtu.be/">
                        <div class="abs top:50% left:50% translate(-50%,-50%) px:32 py:14 bg:black/.8 bg:red:hover fg:white r:8 b:1|solid|white">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </a> -->
                </div>
            </div>


            <!-- As seen on -->
            <div class="flex flex:column align-items:center justify-content:center mb:60 mx:30@sm mx:40@md py:30 r:8 bg:gray-5">
                <div class="f:24 fg:gray-70 mb:20 capitalize font:medium">As seen on</div>
                <div class="max-w:md grid-cols:1 grid-cols:2@sm grid-cols:4@md gap:20 gap:30@sm align-items:center">
                    <div v-for="seen_on in AS_SEEN_ON" class="flex justify-content:center">
                        <a :href="seen_on.url" target="_blank" rel="noopener noreferrer">
                            <img :src="seen_on.logo" :alt="seen_on.name" class="max-h:64 max-w:full" :title="seen_on.name">
                        </a>
                    </div>
                </div>
                <div class="mt:30 text:center">
                    <a href="https://rosua.org/support-portal" target="_blank" class="text:underline">
                        Have you seen us somewhere else? Let us know!
                    </a>
                </div>
            </div>

        </div>

        <!-- Feature Section -->
        <div id="features" class="block-features max-w:screen-xl flex flex:column align-items:center mt:60 mx:20 mx:30@sm mx:40@md mx:auto@xl">
            <div class="px:8 py:4 mb:8 r:8 bg:sky-5 fg:sky-70 text:center uppercase font:bold ls:2">Fully-featured</div>
            <h2 class="mb:22 f:36 font:semibold text:center">Made for Designers and Developers</h2>
            <div class="flex text:center justify-content:center">
                <p class="max-w:60%@md f:18 lh:1.5">
                    At Yabe Siul, we created an <strong>easy-to-use and intuitive Tailwind CSS integration</strong> for WordPress to streamline your workflow.
                </p>
            </div>

            <!-- Features Bento -->
            <div class="bento flex flex:col grid@sm grid-cols:12@sm grid-rows:12@md gap:16 w:full square my:60 {r:8;w:full;overflow:hidden}_.bento__slot {px:22;pt:22}_.bento__slot-title {px:22}_.bento__slot-description">
                <div class="rel bento__slot grid-col-span:12 grid-row-span:3 bg:rgba(229,231,235,0.5)">
                    <div class="bento__slot-title flex fg:tw-gray-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">The Wizard</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div class="w:25%@sm">
                            A simple and intuitive visual interface to customize your Tailwind CSS configuration without coding.
                        </div>
                    </div>
                    <img class="abs@sm right:-220 top:-50 r:16 scale(.8)@sm pt:20 pt:0@sm" src="../../assets/landing/feature-bento-wizard-color.png" alt="feature: wizard colors" />
                </div>
                <div class="rel bento__slot grid-col-span:3 grid-row-span:3 bg:rgba(201,228,222,0.5)">
                    <div class="bento__slot-title flex fg:tw-lime-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">Tailwind CSS version 3.x ready</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            As soon as the new version of Tailwind CSS is released, you can start using it without updating the plugin.
                        </div>
                    </div>
                    <img class="abs@sm right:-30 bottom:-30" src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" alt="Tailwind CSS version 3.x ready" />
                </div>
                <div class="rel bento__slot grid-col-span:3 grid-row-span:6 bg:rgba(250,237,203,0.5)">
                    <div class="bento__slot-title flex fg:tw-yellow-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">Compile in the browser; No server is required</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            Build a single static final CSS without a server. Use Tailwind CSS on any WordPress server, even shared hosting. All processing is done on your browser, and no data transfer occurs.
                        </div>
                    </div>
                    <img class="abs@sm top:40% left:10% r:8 max-w:none pt:20 pt:0@sm" src="../../assets/landing/feature-bento-compile.png" alt="feature: compile" />
                    <img class="abs@sm hidden block@sm z:-1 w:150 h:150 top:-40 right:-40 opacity:.5" src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" alt="Apple Safari logo" />
                    <img class="abs@sm hidden block@sm z:-1 w:150 h:150 top:-40 left:-40 opacity:.5" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Microsoft Edge logo" />
                    <img class="abs@sm hidden block@sm z:-1 w:150 h:150 bottom:-40 right:-40 opacity:.5" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" alt="Mozilla Firefox logo" />
                    <img class="abs@sm hidden block@sm z:-1 w:150 h:150 bottom:-40 left:-40 opacity:.5" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" alt="Google Chromo logo" />
                </div>

                <div class="bento__slot grid-col-span:6 grid-row-span:6 bg:rgba(198,222,241,0.5)">
                    <div class="bento__slot-title flex fg:tw-sky-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">Visual builder integrations</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            Yabe Siul integrated with the most popular visual builders to make using Tailwind CSS in your WordPress website easier. More integrations are coming soon.
                        </div>
                    </div>

                    <div>
                        <div class="p:10 w:full justify-items:center align-items:center grid-cols:2 grid-cols:4@sm grid-auto-flow:dense">
                            <a v-for="builder in VISUAL_BUILDERS" :href="builder.url" class="flex w:full r:8 square align-items:center justify-content:center bg:rgba(198,222,241,0.8):hover">
                                <div class="p:20">
                                    <div class="flex flex:column align-items:center text:center">
                                        <img :src="builder.icon" :alt="builder.name" class="w:40 h:40">
                                        <div class="pt:10">
                                            {{ builder.name }}
                                            <i v-if="builder.pro" class="fa-solid fa-rectangle-pro fg:blue-80"></i>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>


                <div class="rel bento__slot grid-col-span:3 grid-row-span:3 bg:rgba(247,217,196,0.5)">
                    <div class="bento__slot-title flex fg:tw-orange-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">Autocomplete engine</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            As you type, class names will be suggested automatically. The Tailwind CSS cheat sheet is right on your visual builder editor. (available on certain integration)
                        </div>
                    </div>
                    <img class="abs@sm right:-30  bottom:-80 r:8 scale(0.90)@sm pt:20 pt:0@sm" src="../../assets/landing/feature-bento-autocomplete.jpg" alt="feature: autocomplete" />
                </div>


                <div class="rel bento__slot grid-col-span:6 grid-row-span:3 bg:rgba(242,198,222,0.5)">
                    <div class="bento__slot-title flex fg:tw-orange-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">JavaScript package support</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            Add extra functionality to your Tailwind CSS configuration with JavaScript packages through npm. Enrich Tailwind CSS with external plugins.
                        </div>
                    </div>
                    <img class="abs@sm right:-90 bottom:-40 r:8 scale(0.7)@sm  pt:20 pt:0@sm" src="../../assets/landing/feature-bento-javascript-package.png" alt="feature: javascript package" />
                </div>

                <div class="rel bento__slot grid-col-span:3 grid-row-span:3 bg:rgba(199,210,254,0.5)">
                    <div class="bento__slot-title flex fg:tw-indigo-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">Zero configuration yet fully customizable</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            Start using it instantly without any configuration, and customize it as needed.
                        </div>
                    </div>
                    <img class="abs@sm right:-70 bottom:-60 r:8 scale(.8)@sm pt:20 pt:0@sm" src="../../assets/landing/feature-bento-customizable.png" alt="feature: customizable" />
                </div>

                <div class="rel bento__slot grid-col-span:3 grid-row-span:3 bg:rgba(219,205,240,0.5)">
                    <div class="bento__slot-title flex fg:tw-purple-900 align-items:center column-gap:15">
                        <div class="f:18 font:semibold">Lightweight and blazingly fast</div>
                    </div>
                    <div class="bento__slot-description mt:10 lh:1.5">
                        <div>
                            It was built with WordPress REST API and a modern JavaScript framework for a responsive user experience. It has a small footprint and won't slow down your site.
                        </div>
                    </div>

                    <img class="abs@sm right:-70 bottom:-65 scale(0.6)@sm pt:20 pt:0@sm" src="../../assets/landing/feature-bento-wp-rest-api.png" alt="feature: lightweight and blazingly fast" />
                </div>
            </div>

            <!-- Visual builder integrations -->
        </div>


        <!-- Testimonial -->
        <div id="testimonials" class="block-testimonials max-w:screen-xl flex flex:column my:60 mx:20 mx:30@sm mx:40@md mx:auto@xl">

            <!-- Title -->
            <h2 class="mb:22 f:36 font:semibold text:center">Wall of Loves <i class="fa-solid fa-square-heart fg:crimson-70"></i></h2>
            <div class="flex text:center justify-content:center">
                <p class="max-w:60%@md f:18 lh:1.5">
                    We made not only a plugin that works but also a plugin that will make you smile.
                </p>
            </div>

            <!-- Testimonial -->
            <div class="testimonials__wall w:full bg:gray-5 my:60 p:20 p:30@sm p:40@md r:8 ">
                <div class="testimonials__container cols:1 cols:2@sm cols:3@md gap-x:20">
                    <div v-for="testimonial in randomizeTestimonials" class="testimonials__item my:20 break-inside:avoid">
                        <figure class="r:16 bg:white p:20 box-shadow:rgb(255,255,255)|0px|0px|0px|0px,rgba(17,24,39,0.05)|0px|0px|0px|1px,rgba(0,0,0,0.1)|0px|0px|0px|0px,rgba(0,0,0,0.1)|0px|0px|6px|-4px box-shadow:rgb(255,255,255)|0px|0px|0px|0px,rgba(17,24,39,0.05)|0px|0px|0px|1px,rgba(0,0,0,0.1)|0px|10px|15px|-3px,rgba(0,0,0,0.1)|0px|4px|6px|-4px:hover">
                            <blockquote class="fg:#111827">
                                <p class="">{{ testimonial.message }}</p>
                            </blockquote>
                            <figcaption class="mt:24 flex align-items:center gap-x:16">
                                <img class="h:40 w:40 rounded obj:cover" :src="testimonial.submitterAvatar ?? '.../../assets/landing/testimonial-gravatar.svg'" alt="">
                                <div>
                                    <div class="font:semibold">{{ testimonial.submitterName }}</div>
                                    <div class="fg:gray-60">{{ testimonial.submitterTitle }}</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <div class="mt:30 text:center">
                    <a href="https://rosua.org/downloads/yabe-siul#edd-reviews" target="_blank" class="text:underline">
                        submit your testimonial
                    </a>
                </div>
            </div>
        </div>


        <!-- Pricing -->
        <div id="pricing" class="block-pricing max-w:screen-xl flex flex:column my:60 mx:20 mx:30@sm mx:40@md mx:auto@xl">

            <div class="flex flex:column align-items:center mb:16">
                <div class="px:16 py:6 r:8 bg:crimson-5 fg:crimson-70 b:1|solid|crimson-80 text:center font:medium ls:2 lh:1.5">
                    <i class="fa-solid fa-gift fg:crimson-70 pr:6"></i> <span class="ls:1 font:bold">Official launch</span> offer: <code class="font:extrabold bg:white">LTD plan</code>, until <span class="ls:1 font:bold">Mar 14</span>
                </div>
            </div>

            <!-- Title -->
            <h2 class="mb:22 f:36 font:semibold text:center">Pricing</h2>

            <div class="flex text:center justify-content:center">
                <p class="max-w:60%@md f:18 lh:1.5">
                    Your time and coffee are precious, so we made some generous plans for you to choose from.
                </p>
            </div>

            <div class="flex justify-content:center my:30">
                <fieldset class="grid-cols:2 gap-x:4 rounded p:4 text:center f:14 font:semibold lh:1.6 box-shadow:rgb(255,255,255)|0px|0px|0px|0px|inset,rgb(229,231,235)|0px|0px|0px|1px|inset,rgba(0,0,0,0)|0px|0px|0px|0px">
                    <legend class="sr-only">Payment frequency</legend>
                    <label @click="selectedPricingDuration = 'year'" :class="[selectedPricingDuration === 'year' ? 'bg:blue-60 fg:white' : 'fg:gray-70 bg:blue-60/.1:hover']" class="cursor:pointer rounded px:10 py:4">
                        <input type="radio" name="frequency" value="annually" class="sr-only">
                        <span>Annually</span>
                    </label>
                    <label @click="selectedPricingDuration = 'one-time'" :class="[selectedPricingDuration === 'one-time' ? 'bg:blue-60 fg:white' : 'fg:gray-70  bg:blue-60/.1:hover']" class="cursor:pointer rounded px:10 py:4">
                        <input type="radio" name="frequency" value="one-time" class="sr-only">
                        <span>One-time</span>
                    </label>
                </fieldset>
            </div>

            <div class="pricing__wall w:full bg:white my:30 ">

                <div :class="availablePricing.length % 3 === 0 ? 'grid-cols:3@md mx:5%@md' : 'grid-cols:2@md mx:15%@md'" class="pricing__container gap:20 grid-cols:1">
                    <div v-for="price in availablePricing" :class="{ 'most-popular': price.isMostPopular, 'emphasized': price.isEmphasized }" class="pricing__item r:8 p:32 p:40@md">
                        <div class="flex align-items:center justify-content:space-between gap-x:16">
                            <h3 class="pricing__item-title fg:gray-90 f:20 font:semibold lh:1.8">{{ price.title }}</h3>
                            <p v-if="price.isMostPopular" class="special-badge rounded fg:blue-80 bg:blue-10 px:10 py:4 f:12 font:semibold lh:1.65">
                                Most popular
                            </p>
                            <p v-if="price.isEmphasized" class="special-badge rounded fg:blue-80 bg:blue-10 px:10 py:4 f:12 font:semibold lh:1.65">
                                Most favored
                            </p>
                        </div>
                        <p class="pricing__item-subtitle mt:16 f:16 lh:1.72 fg:gray-70">{{ price.subtitle }}</p>
                        <p v-if="price.amount" class="pricing__item-amount mt:24 flex align-items:baseline gap-x:4">
                            <span class="f:36 font:bold ls:0.4 fg:gray-90">${{ price.amount }}</span>
                            <span v-if="price.duration !== 'one-time'" class="f:16 font:semibold lh:1.72 fg:gray-70">/year</span>
                        </p>
                        <p v-else class="pricing__item-amount mt:24 flex align-items:baseline gap-x:4">
                            <span class="f:36 font:bold ls:0.4 fg:gray-90">Free</span>
                        </p>
                        <a :href="price.purchaseButton.url" class="pricing__item-buy mt:24 block r:8 py:8 px:12 text:center f:16 font:semibold lh:1.72 focus-visible:outline outline-offset:2:focus-visible outline-color:blue:focus-visible">
                            {{ price.purchaseButton.text ?? 'Buy' }}
                        </a>
                        <ul role="list" class="pricing__item-feature-container mt:32 f:16 lh:1.72 fg:gray-70 mt:40@lg">
                            <li v-for="feature in price.features" class="flex gap-x:12">
                                <template v-if="typeof feature === 'object'">
                                    <i :class="feature.icon" class="h:24 w:20 flex:none fg:blue-80"></i>
                                    {{ feature.text }}
                                </template>
                                <template v-else>
                                    <i class="fa-solid fa-check h:24 w:20 flex:none fg:blue-80"></i>
                                    {{ feature }}
                                </template>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mx:auto my:30 flex flex:column gap:40">
                    <div class="badges__list grid-cols:1 grid-cols:2@sm grid-cols:4@md">
                        <div class="badges__item">
                            <div class="f:24">
                                <i class="fa-solid fa-badge-dollar fg:#29b077"></i>
                            </div>
                            <div class="f:12 text:left">
                                <strong>14-day Money</strong>
                                <br> Back Guarantee
                            </div>
                        </div>

                        <div class="badges__item">
                            <div class="f:24">
                                <i class="fa-solid fa-headset"></i>
                            </div>
                            <div class="f:12 text:left">
                                <div class="flex fg:#feb82c mb:2">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <strong>Support</strong> Quality
                            </div>
                        </div>

                        <div class="badges__item">
                            <div class="f:24 fg:crimson-80">
                                <i class="fa-solid fa-face-smile-hearts"></i>
                            </div>
                            <div class="f:12 text:left">
                                <strong> {{ happyCustomers }}+ Happy</strong>
                                Users
                            </div>
                        </div>

                        <div class="badges__item">
                            <div class="f:24 fg:#4e6fc3">
                                <i class="fa-brands fa-wordpress"></i>
                            </div>
                            <div class="f:12 text:left">
                                <strong> {{ activeSites }}+ Active</strong>
                                Sites
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    </main>
    <footer class="flex flex:colum my:60">
        <div class="mx:auto flex align-items:center f:16 fg:gray" title="Made with hundred cups of coffee in Indonesia">
            Made with hundred <i class="fa-solid fa-mug px:8"></i> of <i class="fa-solid fa-coffee-bean px:8"></i> in <span class="font:bold px:4">Indonesia</span>
        </div>
    </footer>
</template>



<style lang="scss">
/* Typography */
* {
    font-family: "Outfit", sans-serif;
}

html {
    scroll-behavior: smooth;
}

.primary-nav {
    font-weight: 600;
}

.block-intro {
    .feature__container {}

    .feature__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .feature__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        width: 64px;
        height: 64px;
        background-color: #f9f8fa;
        border-radius: 50%;

        svg:not(.svg-inline--fa) {
            width: 40px;
            height: 40px;
        }
    }

    .feature__title {
        font-size: 16px;
        color: #555456;
        max-width: 120px;
    }
}

.badges__list {
    margin-left: auto;
    margin-right: auto;
    // display: flex;
    gap: 10px;
}

.badges__item {
    display: flex;
    gap: 8px;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 6px;
    padding-bottom: 6px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 160px;
    border-radius: 1e9em;
}

code {
    padding: 2px 4px;
    font-size: .9rem;
    line-height: 1;
    background-color: #afb8c133;
    border-radius: 6px;
    font-weight: 300;
}

/*
      Mobile nav overlay slide transition
    */
.mobile-nav-slide-enter-active {
    transition: all 0.3s ease-out;
}

.mobile-nav-slide-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.mobile-nav-slide-enter-from,
.mobile-nav-slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.testimonials__item blockquote p {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    line-height: 1.4;
}

$color-blue-50: #175fe9;
$color-blue-55: #2671ea;

$color-blue-70: #81acf3;
$color-blue-80: #c6dbfe;

$tw-color-gray-300: #d1d5db;
$tw-color-gray-900: #111827;

@function hexAlpha($hex, $alpha) {
    $opacity: $alpha * 100%;
    @return rgba(red($hex), green($hex), blue($hex), $opacity);
}

.pricing__item {
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgb(229, 231, 235) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

    // if not most popular and not emphasized
    &:not(.most-popular):not(.emphasized) {
        .pricing__item-buy {
            color: $color-blue-50;
            box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px inset, $color-blue-80 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

            &:hover {
                box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px inset, $color-blue-70 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
            }
        }
    }

    .pricing__item-feature-container {
        &>:not([hidden])~:not([hidden]) {
            margin-top: 0.75rem;
        }
    }

    &.most-popular {
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, $color-blue-50 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

        .pricing__item-title {
            color: $color-blue-50;
        }

        .pricing__item-buy {
            color: white;
            background-color: $color-blue-50;

            &:hover {
                background-color: $color-blue-55;
            }
        }

    }

    &.emphasized {
        background-color: $tw-color-gray-900;

        .pricing__item-title,
        .pricing__item-amount>span {
            color: white;
        }

        .pricing__item-subtitle,
        .pricing__item-feature-container>li {
            color: $tw-color-gray-300;

            svg {
                color: white;
            }
        }

        .pricing__item-buy {
            color: white;
            background-color: hexAlpha(#fff, 0.1);

            &:hover {
                background-color: hexAlpha(#fff, 0.2);
            }
        }

        .special-badge {
            color: white;
            background-color: hexAlpha(#fff, 0.1);
        }
    }
}
</style>