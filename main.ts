const{readFileSync:r,writeFileSync:w,mkdirSync:m}=process.getBuiltinModule("node:fs"),I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function run(p,g){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,q=0,pc=0,t=0;
const R=e=>({o:o.subarray(0,l),e});
for(;;){
if(t===1e6)return R(10);
if(pc<0||pc>=n)return R(9);
const op=p[pc];let im=op===1?1:op===2?4:op>47&&op<52?2:0,pp,pu;
if(op<8){pp=[0,0,0,1,1,2,2,3][op];pu=[0,1,1,0,2,2,3,3][op];}
else if(op>15&&op<35&&op!==31){pp=op===23||op===27?1:2;pu=1;}
else if(op>47&&op<53){pp=op===49||op===50?1:0;pu=0;}
else if(op>63&&op<66){pp=op===64?1:2;pu=op===64?1:0;}
else if(op>79&&op<84){pp=op===82?0:1;pu=op===82?1:0;}
else return R(5);
if(pc+im>=n)return R(9);
t++;
if(s<pp)return R(2);
if(s-pp+pu>256)return R(3);
const nx=pc+1+im,u=p[nx-2]|p[nx-1]<<8,v=(u<<16)>>16;pc=nx;
switch(op){
case 0:return R(0);
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:pc=nx+v;break;
case 49:case 50:{const x=D[--s];if((x===0)===(op===49))pc=nx+v;break;}
case 51:if(c===64)return R(7);C[c++]=nx;pc=u;break;
case 52:if(!c)return R(8);pc=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return R(6);D[s-1]=M[a];break;}
case 65:{const a=D[s-1],y=D[s-2];if(a<0||a>255)return R(6);s-=2;M[a]=y;break;}
case 80:{const z=String(D[s-1]);if(l+z.length>65536)return R(11);o.set(Buffer.from(z),l);l+=z.length;s--;break;}
case 81:if(l+1>65536)return R(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=q<g.length?g[q++]:-1;break;
case 83:return R(D[--s]&255);
default:{
const b=D[s-1],a=D[s-2];let e;
if(op<23){
if(op>18&&!b)return R(4);
e=[a+b|0,a-b|0,Math.imul(a,b),a===-2147483648&&b===-1?a:(a/b)|0,b===-1?0:a%b|0,Math.floor((a>>>0)/(b>>>0))|0,(a>>>0)%(b>>>0)|0][op-16];
}else if(op<27)e=[a&b,a|b,a^b][op-24];
else if(op<31)e=[a<<(b&31),a>>(b&31),(a>>>(b&31))|0][op-28];
else e=[a===b?1:0,a<b?1:0,(a>>>0)<(b>>>0)?1:0][op-32];
s-=2;D[s++]=e;
}
}
}
}
for(let k=1;k<41;k++){
const id="i"+("00"+k).slice(-3),a=I+"/"+id+"/",b=O+"/"+id+"/";
const z=run(r(a+"program.bin"),r(a+"input.bin"));
m(b,{recursive:true});w(b+"stdout.bin",z.o);w(b+"exit.txt",z.e+"\n");
}
