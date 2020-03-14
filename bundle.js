if (Deno.args[0]) {
  const [_, bundle] = await Deno.bundle(Deno.args[0]);
  console.log(bundle.replace(/  +/g, " "));
} else {
  console.log("Usage: deno bundle.js visualia.js > visualia.bundle.js");
}
