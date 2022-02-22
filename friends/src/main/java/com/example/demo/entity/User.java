package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

//对应数据表名
@TableName("user")
//使用lombok之后不需要写get、set方法，会通过注解自动生成get、set方法
@Data
public class User {
  //  id排序自增
  @TableId(value = "id",type= IdType.AUTO)
  private Integer id;
  private Integer fid;
  private String name;
  private String commentary;
}
