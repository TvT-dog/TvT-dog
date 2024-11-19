---
data: 2024-07-24
关联:
  - "[[book/知识笔记/渗透/外网打点/基础漏洞/Sql注入/Sql注入]]"
  - "[[book/知识笔记/开发/Java开发/Java数据库/JAVA数据库]]"
---
主要会涉及的依赖为jdbc,mybatis,mybatis-plus.
## JDBC中的Sql注入
### 漏洞代码
```
//不能希望下面这段代码能够直接运行，因为省略了很多东西
import org.springframework.jdbc.core.JdbcTemplate;

private JdbcTemplate jdbcTemplate;
public Boolean sqltest(String offset,String decisionTableId,String symbol,String priority,){
    String sql = String.format("update rule_engine_decision_data set value=%s where input_type=0 and decision_id=%s and %s%s", offset, decisionTableId, symbol, priority);
    jdbcTemplate.update(sql);
}
```

### 修复代码
```
//不能希望下面这段代码能够直接运行，因为省略了很多东西
public int batchUpdateStatus(List<String> ids, String status, String adminId, String time) {
    String sql = "update " + tableName + " set status=:status,admin_id=:adminId,process_time=:time where id in(:ids)";
    MapSqlParameterSource parameterSource = new MapSqlParameterSource()
           .addValue("status", status)
           .addValue("adminId", adminId)
           .addValue("time", time)
           .addValue("ids", ids);
        return this.getWriter().update(sql, parameterSource);   //this.getWriter().update理解为执行SQL的方法就好
}
```
对比代码就是注意占位符？和%s或者可以扩大范围来说是对注意所有字符串的操作。

对于order/group by，表名/列名采用白名单校验

## mybatis框架中的Sql注入
### 代码示例
```
//不能希望下面这段代码能够直接运行，因为省略了很多东西

//文件A调用方法
import com.kuaishou.ee.ks.bpm.rule.store.bpm.mapper.CustomRuleBizRuleDataMapper;
....
Integer order = customRuleBizRuleDataMapper.getMaxDataOrderByRuleId(ruleId);

//文件B提供接口
public interface CustomRuleBizRuleDataMapper  {
  Integer getMaxDraftDataOrderByRuleId(Integer ruleId);
}

//xml文件拼接SQL
<mapper namespace="com.kuaishou.ee.ks.bpm.rule.store.bpm.mapper.CustomRuleBizRuleDataMapper">
    <select id="getMaxDataOrderByRuleId" parameterType="Integer" resultType="java.lang.Integer">
       select max(order_no) from rule_biz_rule_data where rule_id=#{ruleId}
    </select>
</mapper>
```

### 修复
mabatis框架有一个特性，如果在变量输入时，使用了${}，则变量不会进行预编译，如果使用了#{}，则变量会经过预编译。
对于order/group by采用白名单校验

## mybatis-plus
### 示例代码
```
//不能希望下面这段代码能够直接运行，因为省略了很多东西
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

@Override
public List<KsOnboardingExportLog> getByUserIdAndTypeAndStatus(String userId, ExportType exportType,
            ExportStatus exportStatus) {
   EntityWrapper<KsOnboardingExportLog> entityWrapper = new EntityWrapper<>();
   entityWrapper.eq("operator_id", userId);
   entityWrapper.eq("export_type", exportType.getType());
   entityWrapper.eq("export_status", exportStatus.getStatus());
   return this.selectList(entityWrapper);
}
```

### 修复
Mybatis plusAPI禁止从外部传入数据库列名参数。
```
public void test_eq() {
	String columnUnderControl = "name = '1' or 1"; //列名从外出传入
	userMapper.selectList(new QueryWrapper<User>().eq(columnUnderControl, 1));
	// SELECT id,role_id,name,email,age FROM user WHERE (name = '1' or 1 = ?)  //导致sql注入
}
```

Mybatis Plus中还提供了直接拼接sql参数的相关API，这些直接拼接sql的地方都是未经过预编译的，这些API极其容易造成sql注入。
```
// AbstractWrapper类以下API禁止使用

inSql(R column, String inValue)
inSql(boolean condition, R column, String inValue)

//使用in()即可


notInSql(R column, String inValue)
notInSql(boolean condition, R column, String inValue)

//使用notIn()即可

apply(String applySql, Object... params)
apply(boolean condition, String applySql, Object... params)

last(String lastSql)
last(boolean condition, String lastSql)


//UpdateWrapper类以下API禁止使用
setSql(String sql)

// AbstractWrapper类
having(String sqlHaving, Object... params)
having(boolean condition, String sqlHaving, Object... params)

exists(String existsSql)
exists(boolean condition, String existsSql)

notExists(String notExistsSql)
notExists(boolean condition, String notExistsSql)
```
