//funcion debounce para ir actualizando cada cierto tiempo lo que el usuario..
// vaya guardando directo a la bd sus notas
export default function debounce(a,b,c){
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g));
      }
      var f=this,g=arguments;
      return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
    }
  }
  
  
  export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
  };