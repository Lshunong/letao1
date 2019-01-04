$(function(){
    /* 1. 添加搜索记录
      1. 获取当前输入的搜索内容
      2. 不能直接添加这个内容到数组中 把内容存储到一个数组里面去 把数组添加到本地存储中
      3. 判断 去除重复的 如果之前数组中存在这个值 要先删除 再往前添加
      4. 把数组存储到本地存储的中的时候 要把数组转成一个json字符串再存进去
      5. 调用设置本地存储的函数 把json字符串存储到本地存储中 */

      //1.给搜索按钮添加点击事件
      $('.btn-search').on('tap',function(){
        //2.获取当前输入的搜索内容  可能会有首尾空格这种是不合法的输入 把空格去掉 用.trim方法
        var search = $('.input-search').val().trim();
        //3. 进行非空判断 如果用户没有输入或者输入全部是空格不合法 提示用户去输入
        if(search==''){
            mui.alert('你不搜索在下不给', '温馨提示', function () {

            });
        }

        /* 4. 把数据存储加到一个数组中  这里要考虑去重问题
            1. 因为可能不是第一次添加 之前就已经有值 在之前的值的基础上再添加 
            2. 先获取之前的数组 获取之前的键historyData1里面的数组--这个键在本地 */
        var arr = localStorage.getItem('historyData1');//localStorage本地存储器
        // 5. 对数组字符串进行一个转换转成一个JS数组 但是又有可能是第一次加 之前数组不存在 没有数组转不了使用 空数组
        arr= JSON.parse(arr) || [];
        // 6. 还得做数组的去重如果 数组中已经有了这个值 先把这个值删掉 再去添加这个值
        // 判断当前值在数组中存在 因为存在返回当前值的索引 不会是-1
        if(arr.indexOf(search) != -1){
            // 7. 去数组中删除掉这个值, splice是数组的删除一个值的函数 括号里第一个参数的是要删除的索引 第二个参数是删几个 
            arr.splice(arr.indexOf(search),1);
        }
        // 8. 去除了重复之后 在把当前值加到数组的前面 unshift函数把一个值往数组的前面添加
        arr.unshift(search);
        // 9. 数组加完之后吧数组存储到本地存储中 先转出字符串再存储到本地存储中
        arr = JSON.stringify(arr);
        localStorage.setItem('historyData1',arr);
        // 10. 输入完成请空文本框 把输入value值设置为空
        $('.input-search').val('');
        // 11. 添加完成后重新查询一下 显示最新添加的记录
        queryHistory();


      });

      // 一开始调用一下
      queryHistory();
      // 由于每次添加了都需要查询 把查询的代码放到一个函数里面 第一次调用一下 在添加完成也调用一下
      function queryHistory(){

        //1.读取本地存储的值
        var arr = localStorage.getItem('historyData1');
        //2.对数组字符串进行一个转换转成一个JS数组 但是又有可能是第一次加 之前数组不存在 没有数组转不了使用 空数组
        arr =JSON.parse(arr) || [];

        var html = template('searchHistoryTpl',{
            rows:arr
        });
        //3.把模板渲染到页面上
        $('.search-history ul').html(html);
            
      }
})