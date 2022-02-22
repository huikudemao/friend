package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Friends;
import org.springframework.stereotype.Component;

//通用 CRUD 封装BaseMapper 接口，为 Mybatis-Plus 启动时自动解析实体表关系映射转换为 Mybatis 内部对象注入容器
@Component
public interface FriendsMapper extends BaseMapper<Friends> {

}
