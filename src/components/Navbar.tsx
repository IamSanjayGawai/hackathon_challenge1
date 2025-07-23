import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLists } from "../../constance/index.ts";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top", // 'start  end'
      },
    });
    navTween.fromTo('nav', {backgroundColor: 'transparent'}, {
        backgroundColor: '#00000050',
        backgroundFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut'

    })
    

  });
  return (
    <>
      <nav>
        <div>
          <a href="#home" className="flex items-center gap-2">
            <img
              src="images/logo.png"
              className="h-15 w-15  border-2 rounded-full"
            />
            <p>Raw Pressery</p>
          </a>

          <ul>
            {navLists.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
