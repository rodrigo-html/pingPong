        //Elementos
        var campo = document.getElementById('campo')
        var jogador = document.getElementById('jogador')
        var cpu = document.getElementById('cpu')
        var bola = document.getElementById('bola')
        var resJogador = document.getElementById('pontosJogador')
        var resCpu = document.getElementById('pontosCpu')
        var bt = document.getElementById('bt')
        var time = document.getElementById('time')
        var restart = document.getElementById('restart')
        var vitoria = document.getElementById('vitoria')
        var derrota = document.getElementById('derrota')
        var empate = document.getElementById('empate')
        var eft = document.getElementById('eft')
        var cont = 60
        var pontosCpu = 0
        var pontosJogador = 0
        //Posições iniciais X e Y
        const pxJogadorIni = jogador.offsetLeft
        const pyJogadorCpuIni = jogador.offsetTop
        const pxBolaIni = bola.offsetLeft; const pyBolaIni = bola.offsetTop
        var jogadorPx = jogador.offsetLeft; var jogadorPy = jogador.offsetTop
        var cpuPx = cpu.offsetLeft; var cpuPy = cpu.offsetTop
        var bolaPx = bola.offsetLeft; var bolaPy = bola.offsetTop
        var campoPx = campo.offsetLeft; var campoPy = campo.offsetTop
        //Tamanhos Height e Width
        var jogadorH = jogador.offsetHeight; var jogadorW = jogador.offsetWidth
        var cpuH = cpu.offsetHeight; var cpuW = cpu.offsetWidth
        var bolaH = bola.offsetHeight; var bolaW = bola.offsetWidth
        var campoH = campo.offsetHeight; var campoW = campo.offsetWidth
        //Velocidades
        var velJogador = 8; var velCpu = 8; var velBola = 8
        //Direção
        var jogadorDy = 0; var cpuDy = 0
        var bolaDx; var bolaDy = 0
        //Controles
        var loop; var tecla; var run = false; var loop1
        document.addEventListener('keydown',down)
        document.addEventListener('keyup',up)

        bt.addEventListener('click',()=>{
            eft.style.animation='eft 500ms ease-out'
            setTimeout(()=>{start();eft.style.animation='none'},500)
        })
        restart.addEventListener('click',()=>{location.reload()})

        function down(){
            tecla = event.key
            switch (tecla){
                case 'ArrowUp': jogadorDy=-1
                    break
                case 'ArrowDown': jogadorDy=1
            }
        }
        function up(){
            tecla = event.key
            switch (tecla){
                case 'ArrowUp': jogadorDy=0
                    break
                case 'ArrowDown': jogadorDy=0
            }
        }

        function controlaJogador(){
            jogadorPy += jogadorDy*velJogador
            jogador.style.top = jogadorPy+'px'
        }

        function controlaCpu(){

            if(bolaPx>campoW/2&&bolaDx>0){
                console.log(cpuPy)
                console.log(bolaPy)
                //mover para baixo
                if((cpuPy+(cpuH/2))<(bolaPy+(bolaH/2))){
                    cpuPy+=velCpu
                }
                //mover para cima
                if((cpuPy+(cpuH/2))>(bolaPy+(bolaH/2))+8){
                    cpuPy-=velCpu
                }
            }else{ //reposiciona no meio
                if(cpuPy>175){cpuDy=-1}else if(cpuPy<175){cpuDy=1}else{cpuDy=0}
                cpuPy+=cpuDy*velCpu
            }
            cpu.style.top=cpuPy+'px'
        }

        function controlaBola(){
            bolaPy += bolaDy*velBola
            bolaPx += bolaDx*velBola

            //colisao com o jogador
            if(bolaPx<=jogadorPx+jogadorW&&bolaPy+bolaH>=jogadorPy&&bolaPy<=jogadorPy+jogadorH){
                bolaDy=((bolaPy+(bolaH/2))-(jogadorPy+(jogadorH/2)))/32
                bolaDx*=-1
            }
            //colisao com a cpu
            if(bolaPx+bolaW>=cpuPx&&bolaPy+bolaH>=cpuPy&&bolaPy<=cpuPy+cpuH){
                bolaDx*=-1
            }
            //Limite superior e inferior
            if(bolaPy<=campoPy||bolaPy+bolaH>=campoH-9){
                bolaDy*=-1
            }
            //Goal
            if(bolaPx<=jogadorPx){//goal Cpu
                pontosCpu++
                resCpu.value=pontosCpu
                jogadorPy = pyJogadorCpuIni
                cpuPy = pyJogadorCpuIni
                velBola = 0
                bolaPx = pxBolaIni
                bolaPy = pyBolaIni
                run=false
                jogador.style.top=175+'px'
                cpu.style.top=175+'px'
            }else if(bolaPx+bolaW>=cpuPx+cpuW){//goal Jogador
                pontosJogador++
                resJogador.value=pontosJogador
                jogadorPy = pyJogadorCpuIni
                cpuPy = pyJogadorCpuIni
                velBola = 0
                bolaPx = pxBolaIni
                bolaPy = pyBolaIni
                run=false
                jogador.style.top=175+'px'
                cpu.style.top=175+'px'
            }

            bola.style.top=bolaPy+'px'
            bola.style.left=bolaPx+'px'
        }

        function atualizaTime(){
            if(run){
            cont--
            time.value=cont
            if(cont==0){
                run=false
                if(pontosJogador>pontosCpu){
                    vitoria.style.display='block'
                    bt.style.display='none'
                    restart.style.display='block'
                }else if(pontosCpu>pontosJogador){
                    derrota.style.display='block'
                    bt.style.display='none'
                    restart.style.display='block'
                }else{
                    empate.style.display='block'
                    bt.style.display='none'
                    restart.style.display='block'
                }
            }
            }
        }

        function start(){
            if(!run){
                clearInterval(loop1)
                cancelAnimationFrame(loop)
                run = true
                if(Math.random()*10>=5){
                    bolaDx = 1
                }else{bolaDx = -1}
                bolaDy = 0
                velBola = 8
                game()
                loop1 = setInterval(atualizaTime,1000)
            }
        }

        function game(){
            if(run){
                controlaJogador()
                controlaCpu()
                controlaBola()
            }
            loop = requestAnimationFrame(game)
        }