SELECT helo_posts.id AS post_id, helo_posts.username AS author_username FROM helo_posts hp
JOIN helo_users hu ON hu.id = hp.id
WHERE LOWER(title) like $1
ORDER BY date_created DESC;

