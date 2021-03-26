SELECT hp.id AS post_id, title, content, img, profile_pic, date_created, username AS author_username FROM helo_posts hp
JOIN helo_users hu ON hu.id = hp.id
WHERE LOWER(title) like $1
AND hp.author_id != $2
ORDER BY date_created DESC;