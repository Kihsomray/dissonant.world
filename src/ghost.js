class GhostEnemy {
    constructor(player) {
        this.player = player;
        this.spritesheet = ASSET_MANAGER.getImage("e/ghost");

        this.x = Math.random() * CANVAS_WIDTH; // Random starting X position
        this.y = Math.random() * CANVAS_HEIGHT; // Random starting Y position
        this.speed = 1; // Ghost speed
        this.health = 3; // Health of the ghost

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        // Load ghost animations similar to player animations
        // For simplicity, using a single state (0) and direction (0)
        this.animations[0] = [];
        this.animations[0][0] = new Animator(this.spritesheet, /* ... */); // Ghost idle/moving animation
    }

    update() {
        // Simple AI to move towards player
        if (this.player.x > this.x) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }

        if (this.player.y > this.y) {
            this.y += this.speed;
        } else {
            this.y -= this.speed;
        }

        if (this.isDying) {
            if (this.currentAnimation.isDone()) {
                // Remove ghost from the game
                removeFromGameWorld(); // This is a placeholder, actual code will depend on your game's architecture
            }
        } else {
            // Existing movement code
        }

        this.updateBB();
    }

    updateBB() {
        // Update bounding box for collision detection
        // this.BB = new BoundingBox(this.x + 8, this.y + 7, 20, 28);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        // Remove ghost from game
        // Play ghost death animation
        this.isDying = true; // Assuming there's a flag to check if death animation should play
        this.currentAnimation = this.deathAnimation; // Assuming death animation is loaded like other animations

        // After the animation is done, remove the ghost from the game
        // This could be done via a callback or by checking the animation state in the update method
    }

    draw(context) {
        // Draw the ghost with its current animation
        this.animations[0][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
    }

    attack() {
        if (this.isInRange(this.player)) {
            this.player.takeDamage(this.attackPower);
            // Optionally play attack animation and sound
        }
    }

    isInRange(target) {
        // Check if the target is in range for an attack
        const dx = this.x - target.x;
        const dy = this.y - target.y;
        const range = 50; // Adjust range as needed
        return Math.sqrt(dx * dx + dy * dy) < range;
    }

    update() {
        // ... existing movement and dying code

        // Add a check to attack the player when in range
        if (!this.isDying && this.isInRange(this.player)) {
            this.attack();
        }

        // ... existing code
    }
}