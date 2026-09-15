<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>页面地图：从商品到订单</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            六个页面串成一条主链，订单号是唯一的串场线索
        </Text>
    </Box>

    {/* ===== B 区 内容区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 26 }}>
        {/* 左侧主视觉：流程结构图（SVG） */}
        <Box style={{ width: 748, background: '#F4F6F8', borderRadius: 10, padding: 18, justifyContent: 'center' }}>
            <svg width={712} height={492} viewBox='0 0 712 492'>
                {/* 主链连接线 */}
                <line x1='132' y1='64' x2='132' y2='90' stroke='#2AA7CF' strokeWidth='3' />
                <line x1='132' y1='154' x2='132' y2='180' stroke='#2AA7CF' strokeWidth='3' />
                <line x1='132' y1='244' x2='132' y2='270' stroke='#2AA7CF' strokeWidth='3' />
                <line x1='132' y1='334' x2='132' y2='360' stroke='#2AA7CF' strokeWidth='3' />

                {/* 节点 1 */}
                <rect x='0' y='0' width='264' height='64' rx='8' fill='#202259' />
                <text x='18' y='27' fill='#FFFFFF' fontSize='17' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>products.html</text>
                <text x='18' y='48' fill='#7FD3EC' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>商品列表与详情 · Add to Cart</text>

                {/* 节点 2 */}
                <rect x='0' y='90' width='264' height='64' rx='8' fill='#202259' />
                <text x='18' y='117' fill='#FFFFFF' fontSize='17' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>cart.html</text>
                <text x='18' y='138' fill='#7FD3EC' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>购物车 · Proceed to checkout</text>

                {/* 节点 3 */}
                <rect x='0' y='180' width='264' height='64' rx='8' fill='#152964' stroke='#F287B7' strokeWidth='2' />
                <text x='18' y='207' fill='#FFFFFF' fontSize='17' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>checkout.html</text>
                <text x='18' y='228' fill='#F7BEDC' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>结算 · 配送 / 支付 / 摘要</text>

                {/* 节点 4 */}
                <rect x='0' y='270' width='264' height='64' rx='8' fill='#202259' />
                <text x='18' y='297' fill='#FFFFFF' fontSize='17' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>shipping.html</text>
                <text x='18' y='318' fill='#7FD3EC' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>下单落地页 · Awaiting delivery</text>

                {/* 节点 5 */}
                <rect x='0' y='360' width='264' height='64' rx='8' fill='#202259' />
                <text x='18' y='387' fill='#FFFFFF' fontSize='17' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>order.html</text>
                <text x='18' y='408' fill='#7FD3EC' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>订单详情 · ?order=AQ-XXXXXX</text>

                {/* 右侧 account 节点 */}
                <rect x='408' y='180' width='304' height='64' rx='8' fill='#FFFFFF' stroke='#202259' strokeWidth='2' />
                <text x='426' y='207' fill='#202259' fontSize='17' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>account.html</text>
                <text x='426' y='228' fill='#5C646A' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>我的账户 · My orders 列表</text>

                {/* checkout -> account 虚线 */}
                <line x1='264' y1='212' x2='408' y2='212' stroke='#859EB3' strokeWidth='2' strokeDasharray='6 5' />

                {/* 订单号串联标注 */}
                <line x1='132' y1='424' x2='132' y2='460' stroke='#F287B7' strokeWidth='3' />
                <line x1='132' y1='460' x2='620' y2='460' stroke='#F287B7' strokeWidth='3' />
                <circle cx='620' cy='460' r='5' fill='#F287B7' />
                <text x='352' y='452' fill='#B3528A' fontSize='15' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>订单号串起全链</text>

                {/* account -> order 关联 */}
                <line x1='560' y1='244' x2='560' y2='392' stroke='#859EB3' strokeWidth='2' strokeDasharray='6 5' />
                <line x1='560' y1='392' x2='264' y2='392' stroke='#859EB3' strokeWidth='2' strokeDasharray='6 5' />
                <text x='330' y='384' fill='#5C646A' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>点订单号跳转</text>

                {/* 入口模式标注 */}
                <text x='300' y='124' fill='#5C646A' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>?cart=1 购物车模式</text>
                <text x='300' y='146' fill='#5C646A' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>?id= 单品直购模式</text>
                <line x1='266' y1='118' x2='296' y2='118' stroke='#2AA7CF' strokeWidth='2' />
                <line x1='266' y1='140' x2='296' y2='140' stroke='#2AA7CF' strokeWidth='2' />
            </svg>
        </Box>

        {/* 右侧文字 */}
        <Box style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#2AA7CF', letterSpacing: 2, fontWeight: 'bold' }}>HOW TO READ</Text>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#202259', marginTop: 10, lineHeight: 1.35 }}>
                    三种进入结算页的方式，实际只跑通一种
                </Text>
                <Box style={{ flexDirection: 'column', gap: 14, marginTop: 18 }}>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <Box style={{ width: 26, height: 26, borderRadius: 13, background: '#2AA7CF', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>1</Text>
                        </Box>
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>购物车模式（?cart=1）</span>：全站唯一在用的入口，购物车页按钮和商品详情页 Buy Now 都指向它。
                        </Text>
                    </Box>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <Box style={{ width: 26, height: 26, borderRadius: 13, background: '#859EB3', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>2</Text>
                        </Box>
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>单品直购模式（?id=）</span>：代码已实现，但站内没有任何按钮链到它，属于预留路径，目前只能手工拼 URL 打开。
                        </Text>
                    </Box>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <Box style={{ width: 26, height: 26, borderRadius: 13, background: '#F287B7', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>3</Text>
                        </Box>
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>下单之后的落地页是 shipping.html</span>，不是"成功页"。它负责展示待发货状态，真正的订单信息在 order.html。
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Box style={{ padding: '16px 18px', background: 'rgba(32,34,89,0.06)', borderRadius: 8, flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 'auto' }}>
                <FAIcon name='lightbulb' style={{ fill: '#202259', width: 22, height: 22 }} />
                <Text style={{ fontSize: 17, color: '#202259', lineHeight: 1.5 }}>
                    演示时就按这条链走一遍，六个页面一条线，负责人很容易建立地图感。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>04 / 25</Text>
    </Box>
</Slide>
