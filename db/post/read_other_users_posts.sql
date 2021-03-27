select hp.id as post_id, title, content, img, profile_pic, username as author_username, date_created from helo_posts hp
join helo_users hu on hu.id = hp.author_id
where author_id IS NOT $1
order by date_created desc;