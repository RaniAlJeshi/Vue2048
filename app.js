new Vue({
    el:'#canvas',
    data:{
        name:"2048", 
        score:0,
        grid:[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ], 
        canvasData : ""
    },
    created:function(){
        this.grid = this.addNumInRandomLocation(this.grid);
        console.log(this.grid);
    },
    methods:{
        addNumInRandomLocation:function(gridTemp){
            var freeCells = [];
            for(var i=0; i<gridTemp.length; i++) {
                for(var j=0; j<gridTemp[i].length; j++){
                    if(gridTemp[i][j] === 0){
                        freeCells.push({
                            x:i,
                            y:j
                        })
                    }
                }
            }
            if(freeCells.length > 0){
                var rand1 = Math.floor(Math.random() * freeCells.length);
                gridTemp[freeCells[rand1].x][freeCells[rand1].y] = Math.random(1) > 0.5 ? 2 : 4;
            }
            return gridTemp;
        }, 
        keyPressedUp: function(){
            this.grid = this.addNumInRandomLocation(this.grid);            
            this.getScore();
        },
        keyPressedDown: function(){
            this.grid = this.addNumInRandomLocation(this.grid);
            this.getScore();
        },
        keyPressedLeft: function(){
            this.grid = this.addNumInRandomLocation(this.grid);
            this.getScore();
        },
        keyPressedRight: function(){
            this.grid = this.addNumInRandomLocation(this.grid);
            this.getScore();
        }, 
        getScore:function(){
            this.score++;
        }

    }
    
})