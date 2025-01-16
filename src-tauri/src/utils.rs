use rand::{Rng, seq::SliceRandom};

#[tauri::command]
pub fn generate_pw() -> String {
    let mut rng = rand::thread_rng();
    
    // 定义字符集
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    // 禁用的模式
    let forbidden_patterns = ["qwerty", "asdf", "1234", "qaz", "wsx", "asdfgh"];
    
    loop {
        // 生成12-18位的随机长度
        let length = rng.gen_range(12..=18);
        let mut password = String::with_capacity(length);
        
        // 确保以字母开始
        password.push(*lowercase.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        
        // 确保包含必需字符
        password.push(*uppercase.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        password.push(*lowercase.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        password.push(*numbers.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        password.push(*special.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        password.push(*special.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        
        // 填充剩余长度
        let all_chars = format!("{}{}{}{}", uppercase, lowercase, numbers, special);
        while password.len() < length {
            password.push(*all_chars.chars().collect::<Vec<_>>().choose(&mut rng).unwrap());
        }
        
        // 打乱密码
        let mut password: Vec<char> = password.chars().collect();
        password.shuffle(&mut rng);
        
        // 确保第一个字符是字母
        while !password[0].is_alphabetic() {
            let letter_pos = password.iter().position(|c| c.is_alphabetic()).unwrap();
            password.swap(0, letter_pos);
        }
        
        let password: String = password.into_iter().collect();
        
        // 检查连续字符
        let mut has_consecutive = false;
        let mut consecutive_count = 1;
        let mut prev_char = password.chars().next().unwrap();
        
        for c in password.chars().skip(1) {
            if c == prev_char {
                consecutive_count += 1;
                if consecutive_count > 5 {
                    has_consecutive = true;
                    break;
                }
            } else {
                consecutive_count = 1;
            }
            prev_char = c;
        }
        
        // 检查禁用模式
        let has_forbidden = forbidden_patterns.iter()
            .any(|pattern| password.to_lowercase().contains(pattern));
            
        // 如果密码符合所有规则，返回它
        if !has_consecutive && !has_forbidden {
            return password;
        }
    }
} 