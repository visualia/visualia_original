export default {
  docs: `Displays an image.`,
  props: {
    src: { default: "", type: String, docs: "Image URL" },
  },
  template: `
    <div 
      :style="{ 
        background: 'url(' + src + ')',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        height: '100%',
        minHeight: 'calc(var(--base) * 30)'
      }"
      >&nbsp;</div>
  `,
};
