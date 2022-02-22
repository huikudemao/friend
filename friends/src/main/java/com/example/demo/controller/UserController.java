package com.example.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.common.Result;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

//定义返回数据，一般是json
@RestController
//路由
@RequestMapping("/user")
public class UserController {
  //  引入Mapper
  @Resource
  UserMapper userMapper;

  //  定义post接口
  @PostMapping
  //save执行更新
  //  @RequestBody把Json转换成java对象
  //  <?>表示任何一种类型
  public Result<?> save(@RequestBody User user){
    //    新增实体user
    userMapper.insert(user);
    return Result.success(user);
  }

  // 通过fid获取点赞名，评论
  @GetMapping("/page")
  public Result<?> selectListWrapper(@RequestParam(defaultValue = " ") Integer fid) {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("fid", fid);//格式：(字段，值）
    List<User> list = userMapper.selectList(queryWrapper);

    return Result.success(list);
  }

}
