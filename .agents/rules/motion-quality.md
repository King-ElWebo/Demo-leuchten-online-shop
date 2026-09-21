# Motion quality rules

Authority: the current project’s [`DESIGN.md`](../../docs/project/DESIGN.md) and the stack decisions in [`STACK.md`](../../docs/system/STACK.md).

- Every animation needs a purpose.
- Use CSS for simple predictable transitions.
- Use Motion for React for dynamic state, presence, layout, and gestures.
- Use GSAP only when complex timelines, pinning, or advanced scroll choreography justify it.
- Prefer transform and opacity; avoid permanent `will-change`.
- Keep frequent UI interactions fast and add suitable press feedback.
- Use stronger custom easing only when it supports the project’s motion personality.
- Gate hover-specific enhancement behind fine-pointer capability.
- Reduced motion removes large spatial movement and non-essential choreography.
- Avoid random animation on every element and competing motion systems.
- Review motion in the browser, not only in code.
