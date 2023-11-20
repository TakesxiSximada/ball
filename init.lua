-- ボールの基本的な設定
local ball_radius = 1
local ball_speed = 1

-- ボールの状態を管理するテーブル
local ball = {
    pos = {x = 0, y = 0, z = 0},
    velocity = {x = 0, y = 0, z = 0},
}

-- ボールを描画する関数（ボールの物理エンティティを作成）
local function spawn_ball(pos)
   local ball_entity = minetest.add_entity(pos, "ball:ball_entity")
   local ball_object = ball_entity:get_luaentity()
   ball_object.velocity = {x = 1, y = 0, z = 0}
end

-- ボールの物理エンティティの更新関数
local function update_ball_entity(self, dtime)
    local pos = self.object:get_pos()

    -- ボールの位置を更新
    pos.x = pos.x + self.velocity.x * ball_speed
    pos.y = pos.y + self.velocity.y * ball_speed
    pos.z = pos.z + self.velocity.z * ball_speed

    -- ボールが壁に当たった場合、反射する
    if pos.x - ball_radius < 0 or pos.x + ball_radius > 50 then
        self.velocity.x = -self.velocity.x
    end

    if pos.y - ball_radius < 0 or pos.y + ball_radius > 50 then
        self.velocity.y = -self.velocity.y
    end

    if pos.z - ball_radius < 0 or pos.z + ball_radius > 50 then
        self.velocity.z = -self.velocity.z
    end

    -- ボールの位置を更新
    self.object:set_pos(pos)
end

-- ボールのアイテム定義
minetest.register_craftitem("ball:ball", {
    description = "Bouncing Ball",
    inventory_image = "mymod_ball.png", -- テクスチャのパスを指定
    on_use = function(itemstack, player, pointed_thing)
       local player_pos = player:get_pos()
       local ball_entity = minetest.add_entity({x = player_pos.x, y = player_pos.y + 1, z = player_pos.z}, "ball:ball_entity")
       local ball_object = ball_entity:get_luaentity()
       ball_object.velocity = {x = 1, y = 0, z = 0}       
       return itemstack
    end,
})

minetest.register_craft({
    output = "ball:ball", -- クラフト結果のアイテム
    recipe = {
        {"", "", ""}, -- クラフトパターン
        {"", "", ""},
        {"", "", "basenodes:stone"},
    },
})

-- ボールの物理エンティティの登録
minetest.register_entity("ball:ball_entity", {
    physical = true,
    visual = "sprite",
    visual_size = {x = 2 * ball_radius, y = 2 * ball_radius},
    textures = {"mymod_ball.png"},  -- テクスチャのパスを適切なものに変更
    velocity = {x = 1, y = 0, z = 0},
    collisionbox = {-ball_radius, -ball_radius, -ball_radius, ball_radius, ball_radius, ball_radius},
    on_step = update_ball_entity,
})
