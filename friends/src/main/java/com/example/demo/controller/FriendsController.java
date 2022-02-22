package com.example.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.common.Result;
import com.example.demo.mapper.FriendsMapper;
import com.example.demo.entity.Friends;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

//定义返回数据，一般是json
@RestController
//路由
@RequestMapping("/friends")
public class FriendsController {
  //  引入Mapper
  @Resource
  FriendsMapper friendsMapper;

  //  //查询并携带与id相关的数据
  @GetMapping("/{id}")
  public Result<?> getById(@PathVariable Long id) {
    return Result.success(friendsMapper.selectById(id));
  }

  //  定义post接口
  @PostMapping
  //  @RequestBody把Json转换成java对象
  //  <?>表示任何一种类型
  public Result<?> save(@RequestBody Friends friends){
    //    新增实体user
    friendsMapper.insert(friends);
    return Result.success(friends);
  }

  //  id倒序查询
  @GetMapping
  public Result<?> selectWrapper() {
    QueryWrapper<Friends> queryWrapper = new QueryWrapper<>();
    queryWrapper.orderByDesc("id");//格式：(字段，值）
    List<Friends> list = friendsMapper.selectList(queryWrapper);
    return Result.success(list);
  }

  //  修改PutMapping
  //  定义put接口
  @PutMapping
  public Result<?> update(@RequestBody Friends friends){
//    修改实体user
    friendsMapper.updateById(friends);
    return Result.success();
  }
}
