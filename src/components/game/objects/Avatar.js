class Avatar {
    constructor(scene, url) {
        // const randomSprite = Math.floor(Math.random() * 2);
        // const randomXPosition = Math.floor(Math.random() * 620) + 20;
        // const randomYPosition = Math.floor(Math.random() * 400) + 20;
        console.log('new avatar', scene, url)
        scene.load.image('avatar', url);        
        // scene.add.image(400, 300, 'avatar');
        scene.load.start();
        scene.load.on("complete", () => {
            console.log('complete')
            this.sprite = scene.add.sprite(400, 300, 'avatar');
        });
    }
}

export default Avatar;