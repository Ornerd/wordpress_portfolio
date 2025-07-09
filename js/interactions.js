gsap.registerPlugin(SplitText); 
gsap.registerPlugin(ScrollTrigger); 
gsap.registerPlugin(DrawSVGPlugin);


//to display time
function displayTheTime() {
    const timeNow = new Date();

    const currentHour = timeNow.getHours();
    const timeInHours = String(currentHour).padStart(2, '0'); //padStart is used to add "0" to the begining of the number if hs less than two digits.

    const timeInMinutes = String(timeNow.getMinutes()).padStart(2, '0');

    const theResultingTime = `${timeInHours}:${timeInMinutes}`

    const timeElements =document.querySelectorAll('.the_current_time');
    timeElements.forEach(timeElement => {
        timeElement.innerHTML = theResultingTime;  //displaying the final time into any element that holds the class of ".the_current_time"
    });


    //to set icon based on day and night
    const eveningStartTime = 17;
    const morningStartTime = 5;

    if ( currentHour < eveningStartTime  && currentHour > morningStartTime) {
        document.querySelectorAll('.sun_icon').forEach(sun_icon => {
            sun_icon.style.display = 'inline'
        });
        document.querySelectorAll('.moon_icon').forEach(moon_icon => {
            moon_icon.style.display = 'none'
        })
    }else {
         document.querySelectorAll('.sun_icon').forEach(sun_icon => {
            sun_icon.style.display = 'none'
        });
        document.querySelectorAll('.moon_icon').forEach(moon_icon => {
            moon_icon.style.display = 'inline'
        })
    }
};

displayTheTime();

setInterval(displayTheTime, 1000);



//navbar stickness when scrolling back up

const body = document.body;  //code snippet by Chris Miller:https://codepen.io/millertchris/pen/xxdZRmW?preview
let lastScroll = 0;

if (window.scrollY >=81) {
    body.classList.add("scroll-down");  // just a little way to hide the navbar upon reload at any point in the site
}

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;

	if (currentScroll <= 80) {
		body.classList.remove("scroll-up");
		return;
	}
	if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
		body.classList.remove("scroll-up");
		body.classList.add("scroll-down");
	} else if (
		currentScroll < lastScroll &&
		body.classList.contains("scroll-down")
	) {
		body.classList.remove("scroll-down");
		body.classList.add("scroll-up");
	}
	lastScroll = currentScroll;
});


//nav-bar interactions for smaller screens
gsap.set(".mobile_nav_menu", { xPercent: 100 });
gsap.set(".mobile_nav_menu *", { opacity: 0 });

navTL = gsap.timeline({paused: true});

navTL.to(".outer_ham_above", {yPercent:200, duration: 0.3, ease: "power4.out"})
     .to(".outer_ham_below", {yPercent:-200, duration: 0.3, ease: "power4.out"}, "<")
     .to(".inner_ham", {opacity: 0, duration: 0.05,})
     .to(".mobile_nav_menu", {xPercent: 0, duration: 0.5, ease: "power2.inOut"})
     .to(".outer_ham_above", {rotation: 45, duration: 0.3, ease: "power4.out"}, "<")
     .to(".outer_ham_below", {rotation:-45, duration: 0.3, ease: "power4.out"}, "<")
     .to(".mobile_nav_menu *", {opacity: 1, ease: "power4.inOut", stagger: 0.05})


let navIsOpen = false;
document.getElementById("ham-menu").addEventListener("click", ()=> {
    if(!navIsOpen){
        navTL.timeScale(1).play();
        navIsOpen = true;
        document.body.style.overflow = 'hidden';  //helps keep the site in place when nav-menu is open.
        document.body.style.height = '100vh';
        document.body.style.width = '100vw';
    }else {
        navTL.timeScale(3).reverse(); //the 3 inside the timescale helps speed up the timeline by 3 times
        navIsOpen = false;
        document.body.style.overflow = '';  //removing the settings when the menu is closed.
        document.body.style.height = '';
        document.body.style.width = '';
    }
})

//hero-section GSAP intro
// gsap.set("nav", {opacity: 0})
gsap.set(".my_image", {opacity: 0, yPercent: 3})



loaderTL = gsap.timeline({repeat:-1, yoyo: true});
loaderTL.to(".loading-element", {width: " 5rem", backgroundColor: "#f5f5f5",  duration: 1, ease: "power4.inOut"})


document.body.style.overflow = 'hidden';  //helps keep the site in place when page is loading.
document.body.style.height = '100vh';
document.body.style.width = '100vw';

window.addEventListener("load", ()=> {
    document.fonts.ready.then( ()=> {
        document.body.style.overflow = '';  //removing the settings when the when page is loaded.
        document.body.style.height = '';
        document.body.style.width = '';

        loaderTL.pause();
        const HeroSplit = new SplitText('.hero-text-reveal', {type: 'lines', autoSplit: true,  mask: "lines"});
        const DesSplit = new SplitText('.desc', {type: 'chars, words'});
        DesSplit.chars.forEach(char => {
            char.classList.add('square-peg-regular')  //makming sure that the sqaure peg font is applied to the text as per the design.
        })

    

        heroTL = gsap.timeline();  //hero section entrance animation
        heroTL.to(".loading-element", {top: -100, duration: 1, ease: "power4.inOut"})
            .to(".loading-screen", {zIndex: -8000, duration: 1, delay: -0.7, ease: "power4.inOut"})
            .from(".bg-box", {yPercent: -100, opacity:0, duration: 1, stagger:0.1, ease: "power3.inOut"}, "<")
            .from (HeroSplit.lines, {yPercent: 100, duration:0.4, delay: -0.8, stagger: 0.3})
            .to(".my_image", {yPercent: 0, opacity: 1, duration: 1.2, delay: -1, ease: "power1.in"})
            .from(DesSplit.chars, {opacity:0, duration: 0.1, stagger:0.05})
            .to(".loading-screen", {opacity: 0}, "<")



        const pegHeaders = gsap.utils.toArray('.square-peg-header');

        //animation of headers with the square-peg font
        pegHeaders.forEach(pegHeader=> {
           const pegHeaderSplit = new SplitText(pegHeader, {type: 'chars, words'});
            pegHeaderSplit.chars.forEach(char => {
            char.classList.add('square-peg-regular')  //makming sure that the sqaure peg font is applied to the text as per the design.
            })

            gsap.from(pegHeaderSplit.chars, {scrollTrigger: {trigger: pegHeader, start: "top 70%"}, opacity:0, duration: 0.1, stagger:0.05 })
        })

        //my recent projects 

        const sectionHeaders = gsap.utils.toArray('.section-header');
        sectionHeaders.forEach(sectionHeader=> {
           const sectionHeaderSplit = new SplitText(sectionHeader, {type: 'chars, words', mask: "words"});

           gsap.from(sectionHeaderSplit.chars, {scrollTrigger: {trigger: sectionHeader, start: "top 80%"}, yPercent: 100, duration: 1, opacity:0, stagger:0.06, ease: "expo.out"})
        })

        const projects = gsap.utils.toArray('.project');
        projects.forEach((project, i)=> {
           gsap.from(project, {yPercent: 3, opacity:0, scrollTrigger: {trigger: project, start: "top 70%"}, duration: 1, delay: (window.innerWidth > 1023 ?i % 2 === 0 ? 0 : 0.3: 0), ease: "power4.out"})
        })

        // projectsDisplayTL = gsap.timeline({scrollTrigger: {trigger: '.for_resume'}})

        
        //resume svg animation
        resumeTextSplit = new SplitText('.need-my-resume', {type: 'chars, words'});
        resumeTextSplit.chars.forEach(char => {
            char.classList.add('square-peg-regular')  //making sure that the sqaure peg font is applied to the text as per the design.
        })

        resumeTL = gsap.timeline({scrollTrigger: {trigger: '.for_resume'}});
        resumeTL.from(resumeTextSplit.chars, {opacity: 0, duration: 0.1, stagger:0.05})
                .from(".arrow-stick", {drawSVG: 0, duration: 0.5})
                .from(".arrow-head", {drawSVG: "50% 50%", duration: 0.3})
                .from(".resume_holder", {yPercent: 100, xPercent:-100, duration: 0.8, ease: "power4.out"})
    
        
    })
    
})



