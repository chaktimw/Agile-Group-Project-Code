import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
export class level3 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl3);
    }
    player;
    bigboy_enemy;
    bigboy_speed = 100;
    watcher_enemy;
    flying_enemy;
    coin;
    //door1;
    door2;
    platforms;
    block;
    pillar;
    cursors;
    crewels = 0;
    coinCount;
    lifeCount;
    totalCoin = 12;
    spikes;
    zoom;
    jump_count = 0;
 

    keyW;
    keyA;
    keyS;
    keyD;

    keyESC;
    //testing level transition
    keyP;

    data;

    inAir;
    invincible;
    shieldStatus;

    init(data){
        this.data = data;
        this.invincible = false;
        this.shieldStatus = this.data.shield;
    }

    preload(){
    }

    create(){

        // ------------------MOVING SPIKES-----------------------------
        this.movingSpike1 = this.physics.add.image(680,200, 'spike');
        this.movingSpike1.setImmovable(true);
        this.movingSpike1.body.allowGravity = false;
        this.movingSpike1.setDepth(1);
        this.movingSpike1.setVelocityY(200);

        this.movingSpike2 = this.physics.add.image(560,270, 'spike');
        this.movingSpike2.setImmovable(true);
        this.movingSpike2.body.allowGravity = false;
        this.movingSpike2.setDepth(1);
        this.movingSpike2.setVelocityY(200);

        this.movingSpike3 = this.physics.add.image(440,340, 'spike');
        this.movingSpike3.setImmovable(true);
        this.movingSpike3.body.allowGravity = false;
        this.movingSpike3.setDepth(1);
        this.movingSpike3.setVelocityY(200);

        this.movingSpike4 = this.physics.add.image(320,410, 'spike');
        this.movingSpike4.setImmovable(true);
        this.movingSpike4.body.allowGravity = false;
        this.movingSpike4.setDepth(1);
        this.movingSpike4.setVelocityY(200);

        this.movingSpike5 = this.physics.add.image(200,480, 'spike');
        this.movingSpike5.setImmovable(true);
        this.movingSpike5.body.allowGravity = false;
        this.movingSpike5.setDepth(1);
        this.movingSpike5.setVelocityY(200);
        
        console.log("im at level 3");
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //testing level transition
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('up',()=>this.transition());
        

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up',()=>this.pause());
        
        //this.door1 = this.physics.add.staticGroup();
        this.door2 = this.physics.add.staticGroup();
        //this.door1.create(-63, 290, null).setScale(4).refreshBody();
        // this.door1.create(-63, 420, null).setScale(4).refreshBody();
        // this.door1.create(-63, 550, null).setScale(4).refreshBody();
        //this.door2.create(862, 300, null).setScale(4).refreshBody();
        //this.door2.create(862, 400, null).setScale(4).refreshBody();
        this.door2.create(862, 530, null).setScale(4).refreshBody();

        this.add.image(400, 300, 'background');

        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        this.pillar = this.physics.add.staticGroup();
        this.block = this.physics.add.staticGroup();

        this.platforms.create(200, 600, 'ground').setScale(1).refreshBody();
        this.platforms.create(400, 600, 'ground').setScale(1).refreshBody();
        this.platforms.create(600, 600, 'ground').setScale(1).refreshBody();

        this.pillar.create(125, 360, 'pillar').setScale(1).refreshBody();
        this.pillar.create(10, 360, 'pillar').setScale(1).refreshBody();

        //not the ground platforms, to not have overlap need difference of 315 pixels horizontally
        //1st platforms from the top
        this.platforms.create(265, 125, 'ground').setScale(.75).refreshBody();
        this.platforms.create(580, 125, 'ground').setScale(.75).refreshBody();

        //2nd platforms from the top
        this.platforms.create(335, 225, 'ground').setScale(.75).refreshBody();
        this.platforms.create(650, 225, 'ground').setScale(.75).refreshBody();

        //3rd platforms from the top
        this.platforms.create(300, 325, 'ground').setScale(.75).refreshBody();
        this.platforms.create(610, 325, 'ground').setScale(.75).refreshBody();

        //4th platforms from the top
        this.platforms.create(350, 470, 'ground').setScale(.75).refreshBody();
        this.platforms.create(660, 470, 'ground').setScale(.75).refreshBody();


        //blocks at bigboy platform
        this.block.create(750, 390, 'block').setScale(.50).refreshBody();
        this.block.create(775, 390, 'block').setScale(.50).refreshBody();
        this.block.create(800, 390, 'block').setScale(.50).refreshBody();

        //blocks at bottom with spikes
        //removed these because it's too hard. 
        // this.block.create(270, 550, 'block').setScale(.30).refreshBody();
        // this.block.create(300, 540, 'block').setScale(.30).refreshBody();
        // this.block.create(350, 530, 'block').setScale(.30).refreshBody();
        // this.block.create(390, 540, 'block').setScale(.30).refreshBody();
        // this.block.create(500, 540, 'block').setScale(.30).refreshBody();

        // //spikes in the level
        // this.spikes.create(300, 570, 'spike').setScale(.50).refreshBody();
        // this.spikes.create(350, 570, 'spike').setScale(.50).refreshBody();
        // this.spikes.create(400, 570, 'spike').setScale(.50).refreshBody();
        // this.spikes.create(500, 570, 'spike').setScale(.50).refreshBody();
        // this.spikes.create(580, 570, 'spike').setScale(.50).refreshBody();
        // this.spikes.create(670, 570, 'spike').setScale(.50).refreshBody();

        //--- PLAYER CODE BELOW----------
        this.player = this.physics.add.sprite(50, 500, 'player_one_idle');
        this.player.body.offset.x=15;
        this.player.body.offset.y=32;
        //this.canWalljump = true;
        //this.onWall = false;
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_one_idle_sheet', { frames: [0,1,2,3,4,5] }),
            frameRate: 6,
            repeat: -1,
            
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_one_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6, 7, 8] }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_one_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6, 7, 8] }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_one_jump', { frames: [0, 1, 2, 3, 4, 5 ] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player_one_death', { frames: [0,1,2,3,4,5,6,7,8,9,10,11 ] }),
            frameRate: 15,
        });

        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        //----PLAYER CODE ABOVE-----
        //----BIG BOY CODE BELOW-----
        this.bigboy_enemy = this.physics.add.sprite(500, 400, 'big_boy_idle');
        this.bigboy_enemy.setSize(33,42,false);
        this.bigboy_enemy.body.offset.x=15;
        this.bigboy_enemy.body.offset.y=15;
        this.bigboy_enemy.setVelocityX(100);
        //this.time.addEvent({delay: 100, callback: this.bigboy_ATTACK, callbackScope: this, loop: true});
        this.anims.create({
            key: 'idle_boy',
            frames: this.anims.generateFrameNumbers('big_boy_idle', { frames: [0,1,2,3,4,5] }),
            frameRate: 6,
            repeat: -1,
            
        });
        this.anims.create({
            key: 'left_boy',
            frames: this.anims.generateFrameNumbers('big_boy_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6] }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'right_boy',
            frames: this.anims.generateFrameNumbers('big_boy_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6] }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'attack_boy',
            frames: this.anims.generateFrameNumbers('big_boy_attack', { frames: [ 0, 1, 2, 3, 4,  5, 6, 7, 8, 9] }),
            frameRate: 10,
            repeat: -1
        });
        this.bigboy_enemy.setBounce(0.1);
        this.bigboy_enemy.setCollideWorldBounds(true);
        this.bigboy_enemy.setScale(1.0,1.0);
        //this.bigboy_enemy.velocity.x = 100; //doesn't work
        //--------------------------BIG BOY CODE ABOVE-----------------------------------


        //-----------------WATCHER CODE BELOW-----------------------------------------------
        this.watcher_enemy = this.physics.add.sprite(200, 300, 'watcher_idle');
        this.watcher_enemy.setGravity(0,-700);
        this.watcher_enemy.setSize(16,16,false);
        this.rotation_watcher = Phaser.Math.Angle.Between(0,0, this.player.x, this.player.y);
        this.anims.create({
            key: 'attack_watcher',
            frames: this.anims.generateFrameNumbers('watcher_walk', { frames: [0, 1, 2, 3, 4, 5 ,6, 7, 8] }),
            frameRate: 9,
            repeat: -1, 
        });
        this.watcher_enemy.setScale(1.5,1.5);
        this.watcher_enemy.setCollideWorldBounds(true);
        //-----------------WATCHER CODE ABOVE-----------------------------------------------

        //---------------------------FLYING ALIEN CODE BELOW------------------------
        this.flying_enemy = this.physics.add.sprite(500, 300, 'flying_walk');
        this.flying_enemy.setGravity(0,-700);
        this.flying_enemy.setSize(30,30,false);
        this.flying_enemy.body.offset.x=15;
        this.flying_enemy.body.offset.y=22;
        this.anims.create({
            key: 'flying',
            frames: this.anims.generateFrameNumbers('flying_walk', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1, 
        });
        this.flying_enemy.setScale(0.75,0.75);
        this.flying_enemy.setCollideWorldBounds(true);

        //---------------------------FLYING ALIEN CODE ABOVE

        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin',
            repeat: 10,
            setXY: { x: 200, y: 530, stepX: 50 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });
     
        this.coinCount = this.add.text(16, 16, 'crewels:'+this.data.crewels, { fontSize: '12px', fill: '#000' }).setScrollFactor(0);
        this.level3Text = this.add.text( 16,24, 'Level 3', { fontSize: '12px', fill: '#000' }).setScrollFactor(0);
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#000' }).setScrollFactor(0);


        this.crewels = 0;
        //----COLLIDER CODE----

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.block);
      //  this.physics.add.collider(this.player, this.flying_enemy);
       // this.physics.add.collider(this.player, this.bigboy_enemy);
        this.physics.add.collider(this.player, this.pillar);
        this.physics.add.collider(this.bigboy_enemy, this.platforms);
        this.physics.add.collider(this.coin, this.platforms);


        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

       this.cameras.main.setBounds(0, 0, 800, 600);
       this.cameras.main.startFollow(this.player);
       this.cameras.main.setZoom(2);
       
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.bigboy_enemy, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.flying_enemy, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.watcher_enemy, this.playerHitSpike,null, this);
        //this.physics.add.overlap(this.player, this.door1, this.playerHitdoor1,null, this);
        this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);

        // add shield to scene (if purchased)
        if (this.shieldStatus === 1) {
            this.shield = this.physics.add.image(100, 460, 'shield');
            this.shield.body.moves = false;
            this.shield.body.setAllowGravity(false);
            this.shield.setAlpha(0.5);
        }
    }
    

    update(){
        // -----------------------UPDATE MOVING PLATFORMS-----------------
        this.movingSpike(this.movingSpike1, 100, 550, 200);
        this.movingSpike(this.movingSpike2, 100, 550, 200);
        this.movingSpike(this.movingSpike3, 100, 550, 200);
        this.movingSpike(this.movingSpike4, 100, 550, 200);
        this.movingSpike(this.movingSpike5, 100, 550, 200);

        var idle = false;
        var left_wall = 1;
        var right_wall = 2;
    //-----------------PLAYER ANIMATION BELOW-------------------------------------------------
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.player.flipX = false;
          //  player.scale.setTo(-1,1);
        }
        else //else
        {
            idle = true;
            this.player.setVelocityX(0); 
            this.player.anims.play('idle',true);
        }

        const isJumpJustDownc =  Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const isJumpJustDownw = Phaser.Input.Keyboard.JustDown(this.keyW);
        // jump
        if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down) //if
        {
            idle = false;
            this.player.setVelocityY(-400);
            setTimeout(() => {  this.inAir = true; }, 100);
            this.sound.play(Constants.SFX.jump);
            this.player.anims.play('jump',true);
            this.jump_count = 1;
        }
        //for double jump
        if((isJumpJustDownc && (!this.player.body.touching.down && this.jump_count < 2)) || isJumpJustDownw && (!this.player.body.touching.down && this.jump_count < 2)){
            this.doublejump_enabled();
        }
        //reset jump counter
        if(this.player.body.touching.down){
            this.jump_count = 0;
        }
        // landing sound
        if (this.inAir && this.player.body.touching.down) {
            this.inAir = false;
            this.sound.play(Constants.SFX.land);
        }

        if (this.cursors.down.isDown || this.keyS.isDown) //if
        {
            this.player.setVelocityY(170); 
        }  
        //Wall Jump Mechanics
       // if((!this.player.body.blocked.left && !this.player.body.blockedright)){
        //    this.player.setGravity(0,-700);
      //  }
      //if positive can do this
      
        if(this.player.body.touching.down && (!this.player.body.touching.right || !this.player.body.touching.left)){
            this.player.setGravity(0,700);
        }
        if(this.player.body.touching.right && !this.player.body.touching.down){
            this.player.setGravity(0,-400);
            this.player.flipX = true;
        }
        if(this.player.body.touching.left && !this.player.body.touching.down){
            this.player.setGravity(0,-400);
            this.player.flipX = false;
        }
      //right wall
        if((this.cursors.up.isDown && (this.player.body.touching.right && this.player.body.touching.down) || this.keyW.isDown && (this.player.body.touching.right && this.player.body.touching.down)))
        {       
            idle = false;
           // this.player.setGravity(0,-700);
            this.player.setVelocityY(-400);
            this.player.anims.play('jump',true);
        }
        //right wall
        if((this.cursors.up.isDown && (this.player.body.touching.right && !this.player.body.touching.down) || this.keyW.isDown && (this.player.body.touching.right && !this.player.body.touching.down)))
        {
            idle = false;
           // this.player.setGravity(0,-700);
            this.player.setVelocityY(-200);
            this.player.anims.play('jump',true);
        }
        //left wall
        if((this.cursors.up.isDown && (this.player.body.touchingleft && this.hero.body.touching.down) || this.keyW.isDown && (this.player.body.touchingleft && this.hero.body.touching.down)))
        {
            idle = false;
           // this.player.setGravity(0,-300);
            this.player.setVelocityY(-400);
            this.player.anims.play('jump',true);
        }
        //left wall
        if((this.cursors.up.isDown && (this.player.body.touching.left && !this.player.body.touching.down) || this.keyW.isDown && (this.player.body.touching.left && !this.player.body.touching.down)))
        {
            idle = false;
           // this.player.setGravity(0,-300);
            this.player.setVelocityY(-200);
            this.player.anims.play('jump',true);
        }

    //-----------------PLAYER ANIMATION ABOVE------------------------------------------------------------

    //-----------------BIG BOY ANIMATION BELOW-----------------------------------------------------------
    // if(this.bigboy_enemy.body.velocity.x > 0 && this.bigboy_enemy.x < 300 || this.bigboy_enemy.body.velocity.x < 0 && this.bigboy_enemy.x > 700){
    //       this.bigboy_speed *= -1;
    //   }
    //  if(this.bigboy_enemy.x = 500){
    // this.bigboy_enemy.setVelocityX(100);  
    //  }
       if(this.bigboy_enemy.x < 350)
        {
            this.bigboy_enemy.setVelocityX(100);
            this.bigboy_enemy.anims.play('left_boy', true);
            this.bigboy_enemy.flipX = false;
        }
       if(this.bigboy_enemy.x > 750)
        {
            this.bigboy_enemy.setVelocityX(-100);
            this.bigboy_enemy.anims.play('right_boy', true);
            this.bigboy_enemy.flipX = true;

        }
        //if(this.bigboy_enemy.x > 650 || this.bigboy_enemy.x < 649)
       // {
          //this.bigboy_enemy.setVelocityX(0);
        //  this.bigboy_enemy.anims.play('attack_boy', true);
       // }
    //-------------------BIG BOY ANIMATION ABOVE ------------------------------------------------------------

    //-------WATCHER ANIMATION BELOW-------
    this.physics.accelerateToObject(this.watcher_enemy, this.player);
    if(this.watcher_enemy.x > this.player.x){
        this.watcher_enemy.anims.play('attack_watcher', true);
        this.watcher_enemy.flipX = true;
        this.watcher_enemy.body.offset.x=30;
        this.watcher_enemy.body.offset.y=22;    
    }
    if(this.watcher_enemy.x < this.player.x){
        this.watcher_enemy.anims.play('attack_watcher', true);
        this.watcher_enemy.flipX = false;
        this.watcher_enemy.body.offset.x=15;
        this.watcher_enemy.body.offset.y=22;
    }
    //---------WATCHER ANIMATION ABOVE------
    //-------FLYING ALIEN ANIMATION BELOW
    this.physics.accelerateToObject(this.flying_enemy, this.player, 80);
    if(this.flying_enemy.x > this.player.x){
        this.flying_enemy.anims.play('flying', true);
        this.flying_enemy.flipX = false;
    }
    if(this.flying_enemy.x < this.player.x){
        this.flying_enemy.anims.play('flying', true);
        this.flying_enemy.flipX = true;
    }
    //-------FLYING ALIEN ANIMATION ABOVE
        this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        // if(this.keyESC.isDown){
        //     this.scene.pause();
        //     this.scene.launch(Constants.Scenes.pause);
        // }
        // if(this.crewels==this.totalCoin){
        //     // this.scene.pause();
        //     // this.scene.launch(Constants.Scenes.nameInput, this.scene);
        //     console.log(this.scene.key)
        //     this.scene.start(Constants.Scenes.nameInput, [this.crewels, this.scene]);
        // }
      //  this.level3Text.setPosition(this.player.body.position.x-75, this.player.body.position.y-70);
        this.lifeCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-80);

        // update shield position
        if (this.shieldStatus === 1) {
            this.shield.x = this.player.x;
            this.shield.y = this.player.y + 17;
        }
    }

    // playerHitdoor1()
    // {
    //     this.scene.start(Constants.Scenes.lvl2_3,this.data);
    // }
    playerHitdoor2()
    {
        this.scene.start(Constants.Scenes.lvl3_4,this.data);
    }
    playerHitSpike(){
        if (!this.invincible) {

            // set invincibility frame
            this.invincible = true;
            setTimeout(() => {  this.invincible = false; }, 750);

            // if shield is available
            if (this.shieldStatus === 1) {
                // disable shield
                this.shieldStatus = 0;
                this.shield.setAlpha(0);

                // shield recovers after 8 seconds
                setTimeout(() => {  this.shieldStatus = 1; this.shield.setAlpha(0.5);}, 5000);

                // otherwise, player takes damage
            } else {
                // update player lives
                this.data.lives -= 1;
                this.lifeCount.setText('lives: ' + this.data.lives);

                // play take damage sound
                this.sound.play(Constants.SFX.damage);

                // go to graveyard scene if lives hit zero
                if (this.data.lives === 0) {
                    this.scene.start(Constants.Scenes.nameInput, [this.data.crewels, this.scene]);
                }
            }
        }
    }
    doublejump_enabled(){
        if(this.data.doubleJump > 0){
            this.player.setVelocityY(-400);
            setTimeout(() => {  this.inAir = true; }, 100);
            this.sound.play(Constants.SFX.jump);
            this.player.anims.play('jump',true);
            this.jump_count = 2;
            this.data.doubleJump -= 1;
        }
    }

    collectcoin (player, coin){
        coin.disableBody(true, true);

        this.data.crewels += 1;
        this.coinCount.setText('crewels: ' + this.data.crewels);

        // play coin collection sound
        this.sound.play(Constants.SFX.coin);
    }

    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }

    movingSpike(spike, lowerBound, upperBound, speed) {
        if(spike.y <= lowerBound) {
            spike.setVelocityY(speed);
        } else if (spike.y >= upperBound) {
            spike.setVelocityY(-1 * speed);
        }
    }
}