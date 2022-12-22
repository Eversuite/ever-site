<script lang="ts" context="module">
    import {Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";
</script>

<Navbar let:toggle let:hidden>
    <NavBrand href="/">
        <img
                src="./ECH_icon.webp"
                class="mr-3 h-6 sm:h-9 rounded-3xl"
                alt="Flowbite Logo"
        />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Ever-Site
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle}/>
    <NavUl {hidden}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/heroes">Heroes</NavLi>
        <NavLi href="/about">About</NavLi>
    </NavUl>
</Navbar>