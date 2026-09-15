<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>订单落库与订单号</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            一个订单六组字段，订单号是三条路径共用的唯一标识
        </Text>
    </Box>

    {/* ===== B 区（上大图 + 下方卡片） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 16 }}>
        {/* 上：字段 + 订单号 */}
        <Box style={{ height: 232, background: '#F4F6F8', borderRadius: 10, padding: 14, justifyContent: 'center' }}>
            <svg width={1132} height={204} viewBox='0 0 1132 204'>
                {[
                    { g: '基本信息', f: 'id · date · currency' },
                    { g: '商品明细', f: 'items[] · qty · price · bv' },
                    { g: '权益归属', f: 'memberId · operatorId' },
                    { g: '客户与配送', f: 'customer{} · delivery{}' },
                    { g: '支付与状态', f: 'payment · payStatus · status' },
                    { g: '业务来源', f: 'source · 报单中心' },
                ].map(function (it, i) {
                    var col = i % 3;
                    var row = Math.floor(i / 3);
                    var x = col * 222;
                    var y = row * 104;
                    var isKey = it.g === '权益归属';
                    return (
                        <g key={i}>
                            <rect x={x} y={y} width={210} height={92} rx={8} fill={isKey ? '#202259' : '#FFFFFF'} stroke={isKey ? 'none' : '#E3E6E8'} strokeWidth='1.5' />
                            <text x={x + 14} y={y + 28} fill={isKey ? '#7FD3EC' : '#202259'} fontSize={15} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>{it.g}</text>
                            <text x={x + 14} y={y + 56} fill={isKey ? '#FFFFFF' : '#5C646A'} fontSize={13} fontFamily='Menlo, ui-monospace, monospace'>{it.f}</text>
                            {isKey ? (
                                <text x={x + 14} y={y + 78} fill='#F287B7' fontSize={12} fontFamily='Inter, PingFang SC, sans-serif'>决定订单归谁 · 决定账户里怎么分桶</text>
                            ) : null}
                        </g>
                    );
                })}
            </svg>
        </Box>

        {/* 下：三张卡片 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            {[
                { icon: 'hashtag', c: '#2AA7CF', t: '订单号怎么生成', d: '固定 AQ- 前缀，加六位随机字符。字符集是 A 到 Z 加 2 到 9，刻意去掉了 I、O、0、1 四个容易看错的字符。它同时是下单落地页和订单详情页的 URL 参数。' },
                { icon: 'info-circle', c: '#202259', t: '状态取值', d: '创建时内部状态一律是 pending；支付状态默认 Unpaid，只有余额支付成功才会变成 Paid。页面上最终显示四种：Paid、Pending、Unpaid、Failed。' },
                { icon: 'bug', c: '#F287B7', t: '写入顺序有两个要点', d: '结算路径是先写库、再补推荐人字段，所以落库的订单里没有这个字段。另外结算路径把订单插到数组最前面，注册路径是追加到末尾 —— 列表排序因此不同。' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <FAIcon name={it.icon} style={{ fill: it.c, width: 22, height: 22 }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>24 / 31</Text>
    </Box>
</Slide>
